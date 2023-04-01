import { IMapContent, IMarker, IParseMapContentError } from '../types/IMapContent';

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

const sectionKeywords = ['$marker'];

export function parseMapContent(input: string): [IMapContent, IParseMapContentError | null] {
    const mapContent: IMapContent = {
        marker: [],
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
        }
    });

    return [mapContent, parseError];
}

const COORDINATE_REG_EXP = /\(\d+\,\d+\)/g;
const COLOR_REG_EXP = /#([BDGKOPRUWY]|([c][ABCDEF0-9]{6}))\s/g;

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
        return [null, createParseMapContentError('Cannot have multiple colors for the same marker', lineNumber)];
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

function normalizeLineEndings(input: string, normalized = '\r\n') {
    return input.replace(/\r?\n/g, normalized);
}

function removeComment(input: string): string {
    return input.split('//')[0].trim();
}
