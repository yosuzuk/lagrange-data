export function formatNumberWithSuffix(value: number, precision: number = 1): string {
    if (value >= 10000) {
        return `${Number((value / 1000).toFixed(precision))}K`;
    }

    return `${Number(value.toFixed(precision))}`;
}
