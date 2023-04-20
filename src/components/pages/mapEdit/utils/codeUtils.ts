import { normalizeLineEndings } from '../../../../utils/stringUtils';

export const sectionKeywords = [
    '$name',
    '$serverName',
    '$size',
    '$marker',
    '$region',
    '$planet',
    '$station',
    '$base',
    '$outpost',
    '$platform',
];

export const removedSectionKeywords = [
    '$area',
];

export function parseLines(input: string): string[] {
    return normalizeLineEndings(input, '\n').split('\n').map(line => line.trim());
}

export function removeComment(input: string): string {
    return input.split('//')[0].trim();
}
