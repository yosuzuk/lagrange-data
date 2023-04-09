import { normalizeLineEndings } from '../../../../utils/stringUtils';

export const sectionKeywords = ['$system', '$marker', '$region', '$planet', '$station', '$area', '$base'];

export function parseLines(input: string): string[] {
    return normalizeLineEndings(input, '\n').split('\n').map(line => line.trim());
}

export function removeComment(input: string): string {
    return input.split('//')[0].trim();
}
