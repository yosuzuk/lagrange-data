export const colorMap: Record<string, [string, string]> = {
    R: ['red', 'white'],
    B: ['blue', 'white'],
    D: ['gold', 'black'],
    G: ['green', 'white'],
    K: ['black', 'white'],
    O: ['orange', 'black'],
    P: ['pink', 'black'],
    U: ['purple', 'white'],
    W: ['white', 'black'],
    Y: ['yellow', 'black'],
};

export function getTextColorBasedOnBackgroundColor(bgColor: string): string {
    const whiteContrast = getContrast(bgColor, '#ffffff')
    const blackContrast = getContrast(bgColor, '#000000')

    return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

function getRGB(c: string) {
    return parseInt(c, 16);
}

function getsRGB(c: string) {
    return getRGB(c) / 255 <= 0.03928
        ? getRGB(c) / 255 / 12.92
        : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor: string) {
    return (
        0.2126 * getsRGB(hexColor.substr(1, 2)) +
        0.7152 * getsRGB(hexColor.substr(3, 2)) +
        0.0722 * getsRGB(hexColor.substr(-2))
    )
}

function getContrast(f: string, b: string) {
    const L1 = getLuminance(f)
    const L2 = getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}
