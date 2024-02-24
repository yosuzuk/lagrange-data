import { t } from '../../../../i18n';
import { GamePosition } from '../types/Coordinates';
import { AreaType, IArea, IHive, IMapData, IMarker, IOverlayText, IParseMapContentError, IPlanet, IPlayerBase, IPlayerOutpost, IPlayerPlatform, IRegion, IShape, IStation, PlatformType, ShapeType, StationType } from '../types/IMapContent';
import { PlanetSize } from '../types/PlanetSize';
import { parseLines, removeComment, allSectionKeywords } from './codeUtils';
import { snapGamePositionToGridCellCenter, snapGamePositionToGridCellCorner } from './coordinateUtils';
import { formatPlatformLabel } from './mapContentUtils';
import { createPlayerBaseIcon, createCityIcon, createStrongholdIcon, createDefaultStationIcon, createTextImage, mergeIconAndText, applyMarginToImage, createLargePlanetIcon, createSmallPlanetIcon } from './spriteUtils';

const DEFAULT_REGION_COLOR = '#985036';
const DEFAULT_PLANET_COLOR = '#E3A06D';
const NEUTRAL_FACTION_COLOR = '#D0AE55';
const DEFAULT_PLAYER_COLOR = '#0077ff';
const DEFAULT_SHAPE_COLOR = '#666666';

export function parseMapData(input: string, idPrefix?: string): [IMapData, IParseMapContentError | null] {
    const mapContent: IMapData = {
        name: null,
        serverName: null,
        size: null,
        marker: [],
        regions: [],
        planets: [],
        stations: [],
        shapes: [],
        areas: [],
        hives: [],
        bases: [],
        outposts: [],
        platforms: [],
        overlayText: [],
    };
    let parseError: IParseMapContentError | null = null;

    let currentSection = 'unknown';
    parseLines(input).forEach((line: string, index: number) => {
        if (parseError) {
            return;
        }

        const lineNumber = index + 1;
        let trimmedLine = removeComment(line);

        if (trimmedLine.length === 0) {
            return;
        }

        const keywordHit = allSectionKeywords.find(keyword => trimmedLine === keyword || trimmedLine.startsWith(keyword + ' '));
        if (keywordHit) {
            currentSection = keywordHit;
            trimmedLine = trimmedLine.substring(keywordHit.length).trim();
            if (trimmedLine.length === 0) {
                return;
            }
        }

        switch (currentSection) {
            case '$name': {
                mapContent.name = parsePlainText(trimmedLine);
                return;
            }
            case '$serverName': {
                mapContent.serverName = parsePlainText(trimmedLine);
                return;
            }
            case '$size': {
                const [size, error] = parseGridSizeLine(trimmedLine, lineNumber);
                if (size) {
                    mapContent.size = size;
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$marker': {
                const [marker, error] = parseMarkerLine(trimmedLine, lineNumber, idPrefix);
                if (marker) {
                    mapContent.marker.push(marker);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$region': {
                const [region, error] = parseRegionLine(trimmedLine, lineNumber, idPrefix);
                if (region) {
                    mapContent.regions.push(region);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$planet': {
                const [planet, error] = parsePlanetLine(trimmedLine, lineNumber, idPrefix);
                if (planet) {
                    mapContent.planets.push(planet);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$station': {
                const [station, error] = parseStationLine(trimmedLine, lineNumber, idPrefix);
                if (station) {
                    mapContent.stations.push(station);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$shape': {
                const [shape, error] = parseShapeLine(trimmedLine, lineNumber, idPrefix);
                if (shape) {
                    mapContent.shapes.push(shape);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$area': {
                const [area, error] = parseAreaLine(trimmedLine, lineNumber, idPrefix);
                if (area) {
                    mapContent.areas.push(area);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$hive': {
                const [hive, error] = parseHiveLine(trimmedLine, lineNumber, idPrefix);
                if (hive) {
                    mapContent.hives.push(hive);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$base': {
                const [base, error] = parsePlayerBaseLine(trimmedLine, lineNumber, idPrefix);
                if (base) {
                    mapContent.bases.push(base);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$outpost': {
                const [outpost, error] = parsePlayerOutpostLine(trimmedLine, lineNumber, idPrefix);
                if (outpost) {
                    mapContent.outposts.push(outpost);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$platform': {
                const [platform, error] = parsePlayerPlatformLine(trimmedLine, lineNumber, idPrefix);
                if (platform) {
                    mapContent.platforms.push(platform);
                }
                if (error) {
                    parseError = error;
                }
                return;
            }
            case '$overlay': {
                mapContent.overlayText.push(...parseOverlay(trimmedLine));
                return;
            }
        }
    });

    mapContent.serverName = mapContent.serverName ?? mapContent.name ?? null;

    return [mapContent, parseError];
}

const COORDINATE_REG_EXP = /\(\d+\,\d+\)/g;
const COLOR_REG_EXP = /#([BDGKOPRUWY]|([c][abcdefABCDEF0-9]{6}))\s/g;
const POSITIVE_NUMBER_REG_EXP = /^(\d+)\s/g;
const SIZE_REG_EXP = /^(large|medium|small)\s/g;
const STATION_TYPE_REG_EXP = /^(city|subCity|stronghold|base|outpost|platform|dock|default)\s/g;
const SHAPE_TYPE_REG_EXP = /^(filled|outlined)\s/g;
const AREA_TYPE_REG_EXP = /^(city|default)\s/g;
const PLATFORM_TYPE_REG_EXP = /^(basic|intermediate|advanced|bmp|imp|amp)\s/g;

function parseGridSizeLine(line: string, lineNumber: number): [number | null, IParseMapContentError | null] {
    const {
        error: mapSizeError,
        matches: numbers,
    } = parseWithRegExp<string>(line, POSITIVE_NUMBER_REG_EXP, 1, 1);

    if (mapSizeError) {
        return [null, createParseMapContentError('Invalid size', lineNumber)];
    }

    return [
        Number(numbers[0]),
        null,
    ];
}

function parseMarkerLine(line: string, lineNumber: number, idPrefix: string = ''): [IMarker | null, IParseMapContentError | null] {
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
            id: `${idPrefix}marker${lineNumber}`,
            contentType: 'marker',
            lineNumber,
            position: coordinates[0],
            color: parseColor(colors[0], 'white'),
            label: lineWithoutColors ? parsePlainText(lineWithoutColors) : null,
        },
        null,
    ];
}

function parseRegionLine(line: string, lineNumber: number, idPrefix: string = ''): [IRegion | null, IParseMapContentError | null] {
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
            id: `${idPrefix}region${lineNumber}`,
            contentType: 'region',
            lineNumber,
            innerRadiusPoint: coordinates[0],
            outerRadiusPoint: coordinates[1],
            angleStartPoint: coordinates[2],
            angleEndPoint: coordinates[3],
            regionNumber: Number(regionNumbers[0]),
            color: parseColor(colors[0], DEFAULT_REGION_COLOR),
            label: lineWithoutColors ? parsePlainText(lineWithoutColors) : null,
        },
        null,
    ];
}

function parsePlanetLine(line: string, lineNumber: number, idPrefix: string = ''): [IPlanet | null, IParseMapContentError | null] {
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

    const size = planetSizes[0] ?? 'medium';
    const name = lineWithoutColors ? parsePlainText(lineWithoutColors) : null;

    return [
        {
            id: `${idPrefix}planet${lineNumber}`,
            contentType: 'planet',
            lineNumber,
            position: coordinates[0],
            orbitCenter: coordinates[1],
            size,
            color: parseColor(colors[0], DEFAULT_PLANET_COLOR),
            name,
            labelImage: name ? createPlanetLabelImage(size, name) : null,
        },
        null,
    ];
}

function parseStationLine(line: string, lineNumber: number, idPrefix: string = ''): [IStation | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 1, 3);

    if (coordinatesError || coordinates.length === 2) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: stationTypeError,
        matches: stationTypes,
        line: lineWithoutStationTypes,
    } = parseWithRegExp<StationType>(lineWithoutCoordinates, STATION_TYPE_REG_EXP, 0, 1);

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

    const type = stationTypes[0] ?? 'default';
    const level = Number(stationlevels[0]) || null;
    const color = parseColor(colors[0], NEUTRAL_FACTION_COLOR);

    if (type === 'dock' && coordinates.length === 1 && level !== null) {
        const [_center, x, y] = snapGamePositionToGridCellCenter(coordinates[0] as GamePosition);
        coordinates.push(`(${x - 5},${y - 5})`);
        coordinates.push(`(${x + 5},${y + 5})`);
    }

    const name = lineWithoutColors ? parsePlainText(lineWithoutColors) : null;

    return [
        {
            id: `${idPrefix}station${lineNumber}`,
            contentType: 'station',
            lineNumber,
            type,
            position: coordinates[0],
            level,
            color,
            name,
            area: coordinates.length === 3 ? {
                id: `${idPrefix}stationArea${lineNumber}`,
                contentType: 'area',
                type: 'city',
                position1: coordinates[1],
                position2: coordinates[2],
                color,
                lineNumber,
            } : undefined,
            ...createStationIcons(type, level, color, name),
        },
        null,
    ];
}

function parseShapeLine(line: string, lineNumber: number, idPrefix: string = ''): [IShape | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 3, 100);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates (min: 3, max: 100)', lineNumber)];
    }

    const {
        error: shapeTypeError,
        matches: shapeTypes,
        line: lineWithoutShapeTypes,
    } = parseWithRegExp<ShapeType>(lineWithoutCoordinates, SHAPE_TYPE_REG_EXP, 0, 1);

    if (shapeTypeError) {
        return [null, createParseMapContentError('Invalid number of shape types', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
    } = parseWithRegExp(lineWithoutShapeTypes, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `${idPrefix}shape${lineNumber}`,
            contentType: 'shape',
            lineNumber,
            type: shapeTypes[0] ?? 'filled',
            positions: coordinates,
            color: parseColor(colors[0], DEFAULT_SHAPE_COLOR),
        },
        null,
    ];
}

function parseAreaLine(line: string, lineNumber: number, idPrefix: string = ''): [IArea | null, IParseMapContentError | null] {
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
            id: `${idPrefix}area${lineNumber}`,
            contentType: 'area',
            lineNumber,
            type: areaTypes[0] ?? 'default',
            position1: coordinates[0],
            position2: coordinates[1],
            color: parseColor(colors[0], NEUTRAL_FACTION_COLOR),
        },
        null,
    ];
}

function parseHiveLine(line: string, lineNumber: number, idPrefix: string = ''): [IHive | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 2, 2);

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
            id: `${idPrefix}hive${lineNumber}`,
            contentType: 'hive',
            lineNumber,
            position1: coordinates[0],
            position2: coordinates[1],
            color: parseColor(colors[0], NEUTRAL_FACTION_COLOR),
            label: lineWithoutColors ? parsePlainText(lineWithoutColors) : null,
        },
        null,
    ];
}

function parsePlayerBaseLine(line: string, lineNumber: number, idPrefix: string = ''): [IPlayerBase | null, IParseMapContentError | null] {
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

    const color = parseColor(colors[0], DEFAULT_PLAYER_COLOR);
    const name = lineWithoutColors ? parsePlainText(lineWithoutColors) : null;

    const station: IStation = {
        id: `${idPrefix}station${lineNumber}`,
        contentType: 'station',
        lineNumber,
        type: 'base',
        position: position,
        level: null,
        color,
        name,
        area: {
            id: `${idPrefix}area${lineNumber}`,
            contentType: 'area',
            lineNumber,
            type: 'default',
            position1: `(${x - 5},${y - 5})`,
            position2: `(${x + 5},${y + 5})`,
            color: parseColor(colors[0], DEFAULT_PLAYER_COLOR),
        },
        ...createStationIcons('base', null, color, name),
    };

    return [
        {
            id: `${idPrefix}base${lineNumber}`,
            contentType: 'base',
            lineNumber,
            station,
        },
        null,
    ];
}

function parsePlayerOutpostLine(line: string, lineNumber: number, idPrefix: string = ''): [IPlayerOutpost | null, IParseMapContentError | null] {
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

    const color = parseColor(colors[0], DEFAULT_PLAYER_COLOR);
    const name = lineWithoutColors ? parsePlainText(lineWithoutColors) : t('mapEdit.station.outpost');

    const station: IStation = {
        id: `${idPrefix}station${lineNumber}`,
        contentType: 'station',
        lineNumber,
        type: 'outpost',
        position: position,
        level: null,
        color,
        name,
        area: {
            id: `${idPrefix}area${lineNumber}`,
            contentType: 'area',
            lineNumber,
            type: 'default',
            position1: `(${x - 5},${y - 5})`,
            position2: `(${x + 5},${y + 5})`,
            color: parseColor(colors[0], DEFAULT_PLAYER_COLOR),
        },
        ...createStationIcons('outpost', null, color, name),
    };

    return [
        {
            id: `${idPrefix}outpost${lineNumber}`,
            contentType: 'outpost',
            lineNumber,
            station,
        },
        null,
    ];
}

function parsePlayerPlatformLine(line: string, lineNumber: number, idPrefix: string = ''): [IPlayerPlatform | null, IParseMapContentError | null] {
    const {
        error: coordinatesError,
        matches: coordinates,
        line: lineWithoutCoordinates,
    } = parseWithRegExp<GamePosition>(line, COORDINATE_REG_EXP, 1, 1);

    if (coordinatesError) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const {
        error: platformTypeError,
        matches: platformTypes,
        line: lineWithoutPlatformTypes,
    } = parseWithRegExp<AreaType>(lineWithoutCoordinates, PLATFORM_TYPE_REG_EXP, 0, 1);

    if (platformTypeError) {
        return [null, createParseMapContentError('Invalid number of platform types', lineNumber)];
    }

    const {
        error: colorError,
        matches: colors,
        line: lineWithoutColors,
    } = parseWithRegExp(lineWithoutPlatformTypes, COLOR_REG_EXP, 0, 1);

    if (colorError) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    const [position, x, y] = snapGamePositionToGridCellCorner(coordinates[0] as GamePosition);

    const platformType = platformTypes[0] as PlatformType;
    const color = parseColor(colors[0], DEFAULT_PLAYER_COLOR);
    const name = lineWithoutColors ? parsePlainText(lineWithoutColors) : formatPlatformLabel(platformType);

    const station: IStation = {
        id: `${idPrefix}station${lineNumber}`,
        contentType: 'station',
        lineNumber,
        type: 'platform',
        position: position,
        level: null,
        color,
        name,
        area: {
            id: `${idPrefix}area${lineNumber}`,
            contentType: 'area',
            lineNumber,
            type: 'default',
            position1: `(${x - 10},${y - 10})`,
            position2: `(${x + 10},${y + 10})`,
            color: parseColor(colors[0], DEFAULT_PLAYER_COLOR),
        },
        ...createStationIcons('platform', null, color, name),
    };

    return [
        {
            id: `${idPrefix}platform${lineNumber}`,
            contentType: 'platform',
            type: platformTypes[0] as PlatformType,
            lineNumber,
            station,
        },
        null,
    ];
}

function parseOverlay(rawText: string): IOverlayText[] {
    const [type, text] = getOverlayTextType(rawText);
    return text.split('#r').map(line => ({
        text: line.trim(),
        type,
    }));
}

function getOverlayTextType(line: string): [IOverlayText['type'], string] {
    if (line.startsWith('### ')) {
        return ['h3', line.substring(4)];
    }
    if (line.startsWith('## ')) {
        return ['h2', line.substring(3)];
    }
    if (line.startsWith('# ')) {
        return ['h1', line.substring(2)];
    }
    return ['normal', line];
}

function parsePlainText(text: string): string {
    return text.split('#r').map(line => line.trim()).join('\n');
}

interface IParseWithRegExpResult<TResult> {
    error: boolean;
    matches: TResult[];
    line: string;
}

function parseWithRegExp<TResult = string>(line: string, regexp: RegExp, minCount: number, maxCount: number): IParseWithRegExpResult<TResult> {
    const matches = (line + ' ').match(regexp);

    if (minCount > 0 && (!matches || matches.length === 0)) {
        return {
            error: true,
            matches: [],
            line,
        };
    }

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

function createStationIcons(type: StationType, level: number | null, color: string, name: string | null) {
    const icon = getStationIcon(type, level, color);
    const text = getTextImage(level, color, name, false);
    const textWithLevel = Number.isFinite(level) ? getTextImage(level, color, name, true) : null;

    return {
        icon,
        iconCenteredLabel: getIconCenteredLabelImage(icon, text),
        textCenteredLabel: getTextCenteredLabelImage(icon, text),
        iconCenteredLabelWithLevel: textWithLevel ? getIconCenteredLabelImage(icon, textWithLevel) : null,
        textCenteredLabelWithLevel: textWithLevel ? getTextCenteredLabelImage(icon, textWithLevel) : null,
    };
}

function getStationIcon(type: StationType, level: number | null, color: string): HTMLCanvasElement {
    switch (type) {
        case 'base': {
            return createPlayerBaseIcon(color);
        }
        case 'city': {
            return createCityIcon(level, color);
        }
        case 'stronghold': {
            return createStrongholdIcon(color);
        }
        case 'outpost':
        case 'platform': {
            // TODO new icon
            return createDefaultStationIcon(color);
        }
        default: {
            return createDefaultStationIcon(color);
        }
    }
}

function getTextImage(level: number | null, color: string, name: string | null, withLevel: boolean): HTMLCanvasElement | null {
    const labelText = getLabelText(level, name, withLevel);
    if (!labelText) {
        return null;
    }
    return createTextImage({
        text: labelText,
        fontSize: 12,
        color,
    });
}

function getLabelText(level: number | null, name: string | null, withLevel: boolean): string {
    const parts: string[] = [
        ...(!!name ? [name] : []),
        ...((withLevel && Number.isFinite(level)) ? [`Lv${level}`] : []),
    ];
    return parts.join(' ');
}

function getTextCenteredLabelImage(iconCanvas: HTMLCanvasElement | null, textCanvas: HTMLCanvasElement | null): HTMLCanvasElement | null {
    if (iconCanvas && textCanvas) {
        return mergeIconAndText({
            iconCanvas,
            textCanvas,
            spacing: 4,
            padding: 1,
            marginBottom: 60,
            backgroundColor: 'rgba(0,0,0,0.3)',
        });
    }

    const image = textCanvas ?? iconCanvas ?? null;
    if (!image) {
        return null;
    }

    return applyMarginToImage({
        image,
        marginBottom: 60,
        backgroundColor: 'rgba(0,0,0,0.3)',
    });
}

function getIconCenteredLabelImage(iconCanvas: HTMLCanvasElement | null, textCanvas: HTMLCanvasElement | null): HTMLCanvasElement | null {
    if (iconCanvas && textCanvas) {
        return mergeIconAndText({
            iconCanvas,
            textCanvas,
            spacing: 4,
            padding: 1,
            centerIcon: true,
        });
    }
    return textCanvas ?? iconCanvas ?? null;
}

function createPlanetLabelImage(planetSize: PlanetSize, name: string): HTMLCanvasElement {
    const iconCanvas = planetSize === 'small' ? createSmallPlanetIcon() : createLargePlanetIcon();
    const textCanvas = createTextImage({
        text: name,
        color: 'white',
        fontSize: 12,
    });
    return mergeIconAndText({
        iconCanvas,
        textCanvas,
        spacing: 4,
        marginTop: (planetSize === 'large' ? 55 : 35) + Math.max(iconCanvas.height, textCanvas.height),
    });
}
