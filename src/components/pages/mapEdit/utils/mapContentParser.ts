import { normalizeLineEndings } from '../../../../utils/stringUtils';
import { IMapContent, IMarker, IParseMapContentError, IPlanet, IRegion } from '../types/IMapContent';
import { PlanetSize } from '../types/PlanetSize';

/*
Example:
$marker
(1000,2000)
(1000,2020)
(1020,2000) Gather here
(1020,2020) Target
(1040,2000) #R Red
(1040,2020) #c00FF00 Hex Color
*/

const sectionKeywords = ['$marker', '$region', '$planet'];

export function parseMapContent(input: string): [IMapContent, IParseMapContentError | null] {
    const mapContent: IMapContent = {
        marker: [],
        regions: [],
        planets: [],
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
        }
    });

    return [mapContent, parseError];
}

const COORDINATE_REG_EXP = /\(\d+\,\d+\)/g;
const COLOR_REG_EXP = /#([BDGKOPRUWY]|([c][ABCDEF0-9]{6}))\s/g;
const POSITIVE_NUMBER_REG_EXP = /^(\d+)\s/g;
const SIZE_REG_EXP = /^(large|medium|small)\s/g;

function parseMarkerLine(line: string, lineNumber: number): [IMarker | null, IParseMapContentError | null] {
    const coordinates = line.match(COORDINATE_REG_EXP);
    if (!coordinates || coordinates.length === 0) {
        return [null, null];
    }

    if (coordinates.length > 1) {
        return [null, createParseMapContentError('Each marker needs to be a separate line', lineNumber)];
    }

    const lineWithoutCoordinate = line.replace(COORDINATE_REG_EXP, '').trim();

    const colors = lineWithoutCoordinate.match(COLOR_REG_EXP);
    if (colors && colors.length > 1) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `marker${lineNumber}`,
            position: coordinates[0],
            color: (colors?.[0]) ? parseColor(colors[0].trim()) : 'white',
            label: lineWithoutCoordinate.replace(COLOR_REG_EXP, '').trim(),
        },
        null,
    ];
}

function parseRegionLine(line: string, lineNumber: number): [IRegion | null, IParseMapContentError | null] {
    const coordinates = line.match(COORDINATE_REG_EXP);
    if (!coordinates || coordinates.length === 0) {
        return [null, null];
    }

    if (coordinates.length !== 4) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const lineWithoutCoordinate = line.replaceAll(COORDINATE_REG_EXP, '').trim();

    const colors = lineWithoutCoordinate.match(COLOR_REG_EXP);
    if (!colors || colors.length > 1) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    const lineWithoutColor = lineWithoutCoordinate.replace(COLOR_REG_EXP, '').trim() + ' ';

    const numbers = lineWithoutColor.match(POSITIVE_NUMBER_REG_EXP);
    if (!numbers || numbers.length !== 1) {
        return [null, createParseMapContentError('Missing region number', lineNumber)];
    }

    const lineWithoutRegionNumber = lineWithoutColor.replace(POSITIVE_NUMBER_REG_EXP, '').trim();

    return [
        {
            id: `region${lineNumber}`,
            innerRadiusPoint: coordinates[0],
            outerRadiusPoint: coordinates[1],
            angleStartPoint: coordinates[2],
            angleEndPoint: coordinates[3],
            color: (colors?.[0]) ? parseColor(colors[0].trim()) : 'white',
            regionNumber: Number(numbers[0].trim()),
            label: lineWithoutRegionNumber || null,
        },
        null,
    ];
}

function parsePlanetLine(line: string, lineNumber: number): [IPlanet | null, IParseMapContentError | null] {
    const coordinates = line.match(COORDINATE_REG_EXP);
    if (!coordinates || coordinates.length === 0) {
        return [null, null];
    }

    if (coordinates.length > 2) {
        return [null, createParseMapContentError('Invalid number of coordinates', lineNumber)];
    }

    const lineWithoutCoordinate = line.replace(COORDINATE_REG_EXP, '').trim();

    const sizes = (lineWithoutCoordinate + ' ').match(SIZE_REG_EXP);
    const lineWithoutSize = (lineWithoutCoordinate + ' ').replace(SIZE_REG_EXP, '').trim();

    const colors = lineWithoutSize.match(COLOR_REG_EXP);
    if (colors && colors.length > 1) {
        return [null, createParseMapContentError('Invalid number of colors', lineNumber)];
    }

    return [
        {
            id: `planet${lineNumber}`,
            position: coordinates[0],
            orbitCenter: coordinates[1],
            size: (sizes?.[0]?.trim() as PlanetSize) ?? 'medium',
            color: (colors?.[0]) ? parseColor(colors[0].trim()) : '#E3A06D',
            name: lineWithoutCoordinate.replace(COLOR_REG_EXP, '').trim(),
        },
        null,
    ];
}

function parseColor(input: string): string {
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

function parseLines(input: string): string[] {
    return normalizeLineEndings(input, '\n').split('\n').map(line => line.trim());
}

function removeComment(input: string): string {
    return input.split('//')[0].trim();
}
