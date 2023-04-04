export function normalizeLineEndings(input: string, normalized = '\r\n') {
    return input.replace(/\r?\n/g, normalized);
}
