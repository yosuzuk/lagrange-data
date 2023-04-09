import { GamePosition } from '../types/Coordinates';
import { AreaType, IArea, IMap, IMarker, IParseMapContentError, IPlanet, IPlayerBase, IRegion, IStation } from '../types/IMapContent';
import { PlanetSize } from '../types/PlanetSize';
import { parseLines, removeComment, sectionKeywords } from './codeUtils';
import { snapGamePositionToGridCellCenter } from './coordinateUtils';

const DEFAULT_REGION_COLOR = '#985036';
const DEFAULT_PLANET_COLOR = '#E3A06D';
const NEUTRAL_FACTION_COLOR = '#F7C360';
const DEFAULT_PLAYER_COLOR = '#0077ff';

export function parseMapContent(input: string): [IMap, IParseMapContentError | null] {
    const mapContent: IMap = {
        system: null,
        marker: [],
        regions: [],
        planets: [],
        stations: [],
        areas: [],
        bases: [],
    };
    let parseError: IParseMapContentError | null = null;

    let currentSection = 'unknown';
    parseLines(input).forEach((line: string, index: number) => {
        if (parseError) {
            return;
        }

        const lineNumber = index + 1;
        const trimmedLine = removeComment(line);

        if (trimmedLine.length === 0) {
            return;
        }

        if (sectionKeywords.includes(trimmedLine)) {
            currentSection = line;
            return;
        }

        switch (currentSection) {
            case '$system': {
                // TODO implement
                return;
            }
            case '$marker': {
                const [marker, error] = parseMarkerLine(trimmedLine, lineNumber);
                if (marker) {
                    mapContent.marker.push(marker);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$region': {
                const [region, error] = parseRegionLine(trimmedLine, lineNumber);
                if (region) {
                    mapContent.regions.push(region);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$planet': {
                const [planet, error] = parsePlanetLine(trimmedLine, lineNumber);
                if (planet) {
                    mapContent.planets.push(planet);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$station': {
                const [station, error] = parseStationLine(trimmedLine, lineNumber);
                if (station) {
                    mapContent.stations.push(station);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$area': {
                const [area, error] = parseAreaLine(trimmedLine, lineNumber);
                if (area) {
                    mapContent.areas.push(area);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$base': {
                const [base, error] = parsePlayerBaseLine(trimmedLine, lineNumber);
                if (base) {
                    mapContent.bases.push(base);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
        }
    });

    return [mapContent, parseError];
}

const COORDINATE_REG_EXP = /\(\d+\,\d+\)/g;
const COLOR_REG_EXP = /#([BDGKOPRUWY]|([c][abcdefABCDEF0-9]{6}))\s/g;
const POSITIVE_NUMBER_REG_EXP = /^(\d+)\s/g;
const SIZE_REG_EXP = /^(large|medium|small)\s/g;
const STATION_TYPE_REG_EXP = /^(city|stronghold|base|default)\s/g;
const AREA_TYPE_REG_EXP = /^(city|default)\s/g;

function parseMarkerLine(line: string, lineNumber: number): [IMarker | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 1, 1);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
        line: lineWithoutColors,
    } = parseWithRegExp(lineWithoutCoordinates, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `marker${lineNumber}`,
            position: coordinates[0],
            color: parseColor(colors[0], 'white'),
            label: lineWithoutColors || null,
        },
        null,
    ];
}

function parseRegionLine(line: string, lineNumber: number): [IRegion | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 4, 4);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: regionNumbersError,
        matches: regionNumbers,
        line: lineWithoutRegionNumbers,
    } = parseWithRegExp<string>(lineWithoutCoordinates, POSITIVE_NUMBER_REG_EXP, 1, 1);

    if (regionNumbersError) {
        return [null, createParseMapContentError('Invalid number of region numbers', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
        line: lineWithoutColors,
    } = parseWithRegExp(lineWithoutRegionNumbers, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `region${lineNumber}`,
            innerRadiusPoint: coordinates[0],
            outerRadiusPoint: coordinates[1],
            angleStartPoint: coordinates[2],
            angleEndPoint: coordinates[3],
            regionNumber: Number(regionNumbers[0]),
            color: parseColor(colors[0], DEFAULT_REGION_COLOR),
            label: lineWithoutColors || null,
        },
        null,
    ];
}

function parsePlanetLine(line: string, lineNumber: number): [IPlanet | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 1, 2);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: planetSizeError,
        matches: planetSizes,
        line: lineWithoutPlanetSizes,
    } = parseWithRegExp<PlanetSize>(lineWithoutCoordinates, SIZE_REG_EXP, 0, 1);

    if (planetSizeError) {
        return [null, createParseMapContentError('Invalid number of planet sizes', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
        line: lineWithoutColors,
    } = parseWithRegExp(lineWithoutPlanetSizes, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `planet${lineNumber}`,
            position: coordinates[0],
            orbitCenter: coordinates[1],
            size: planetSizes[0] ?? 'medium',
            color: parseColor(colors[0], DEFAULT_PLANET_COLOR),
            name: lineWithoutColors || null,
        },
        null,
    ];
}

function parseStationLine(line: string, lineNumber: number): [IStation | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 1, 1);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: stationTypeError,
        matches: stationTypes,
        line: lineWithoutStationTypes,
    } = parseWithRegExp<AreaType>(lineWithoutCoordinates, STATION_TYPE_REG_EXP, 0, 1);

    if (stationTypeError) {
        return [null, createParseMapContentError('Invalid number of station types', lineNumber)];
    }

    const {
        error: stationLevelError,
        matches: stationlevels,
        line: lineWithoutStationLevels,
    } = parseWithRegExp<string>(lineWithoutStationTypes, POSITIVE_NUMBER_REG_EXP, 0, 1);

    if (stationLevelError) {
        return [null, createParseMapContentError('Invalid number of station levels', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
        line: lineWithoutColors,
    } = parseWithRegExp(lineWithoutStationLevels, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `station${lineNumber}`,
            type: stationTypes[0] ?? 'default',
            position: coordinates[0],
            level: Number(stationlevels[0]) || null,
            color: parseColor(colors[0], NEUTRAL_FACTION_COLOR),
            name: lineWithoutColors || null,
        },
        null,
    ];
}

function parseAreaLine(line: string, lineNumber: number): [IArea | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 2, 2);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: areaTypeError,
        matches: areaTypes,
        line: lineWithoutAreaTypes,
    } = parseWithRegExp<AreaType>(lineWithoutCoordinates, AREA_TYPE_REG_EXP, 0, 1);

    if (areaTypeError) {
        return [null, createParseMapContentError('Invalid number of area types', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
    } = parseWithRegExp(lineWithoutAreaTypes, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `area${lineNumber}`,
            type: areaTypes[0] ?? 'default',
            position1: coordinates[0],
            position2: coordinates[1],
            color: parseColor(colors[0], NEUTRAL_FACTION_COLOR),
        },
        null,
    ];
}

function parsePlayerBaseLine(line: string, lineNumber: number): [IPlayerBase | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 1, 1);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
        line: lineWithoutColors,
    } = parseWithRegExp(lineWithoutCoordinates, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    const [position, x, y] = snapGamePositionToGridCellCenter(coordinates[0] as GamePosition);

    const area: IArea = {
        id: `area${lineNumber}`,
        type: 'default',
        position1: `(${x - 5},${y - 5})`,
        position2: `(${x + 5},${y + 5})`,
        color: parseColor(colors[0], DEFAULT_PLAYER_COLOR),
    };
    const station: IStation = {
        id: `station${lineNumber}`,
        type: 'base',
        position: position,
        level: null,
        color: parseColor(colors[0], DEFAULT_PLAYER_COLOR),
        name: lineWithoutColors || null,
    };

    return [
        {
            id: `base${lineNumber}`,
            station,
            area,
        },
        null,
    ];
}

interface IParseWithRegExpResult<TResult> {
    error: boolean;
    matches: TResult[];
    line: string;
}

function parseWithRegExp<TResult = string>(line: string, regexp: RegExp, minCount: number, maxCount: number): IParseWithRegExpResult<TResult> {
    const matches = (line + ' ').match(regexp);
    if (matches && (matches.length < minCount || matches.length > maxCount)) {
        return {
            error: true,
            matches: [],
            line,
        };
    }

    let remainingLine = line;
    for (let i = 0; i < (matches?.length ?? 0); i++) {
        remainingLine = (remainingLine + ' ').replace(regexp, '');
    }

    return {
        error: false,
        matches: matches?.map(m => m.trim() as TResult) ?? [],
        line: remainingLine.trim()
    };
}

function parseColor(input: string | undefined, defaultColor: string): string {
    if (!input) {
        return defaultColor;
    }

    if (input.startsWith('#c')) {
        return `#${input.split('#c')[1]}`;
    }
    switch (input) {
        case '#B': return 'blue';
        case '#D': return 'gold';
        case '#G': return 'green';
        case '#K': return 'black';
        case '#O': return 'orange';
        case '#P': return 'pink';
        case '#R': return 'red';
        case '#U': return 'purple';
        case '#W': return 'white';
        case '#Y': return 'yellow';
        default: {
            return 'white';
        }
    }
}

function createParseMapContentError(message: string, line: number) {
    return {
        message,
        line,
    };
}
