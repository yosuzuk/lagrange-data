export function combineBoolMap<TMap>(overrides: string[], defaultMap: TMap): TMap {
    if (overrides.length > 0) {
        const overridesBoolMap = arrayToBoolMap(overrides);

        return Object.keys(defaultMap as Record<string, unknown>).reduce((acc, next) => ({
            ...acc,
            [next]: overridesBoolMap[next] ?? false,
        }), { ...defaultMap });
    }
    return defaultMap;
}

export function boolMapToArray<TMap>(boolMap: TMap): (keyof TMap)[] {
    const usedKeys = Object.keys(boolMap as Record<string, unknown>).filter(key => boolMap[key as keyof TMap]);
    return usedKeys.length > 0 ? usedKeys as (keyof TMap)[] : [];
}

function arrayToBoolMap(array: string[]): Record<string, boolean> {
    return array.reduce((acc, next) => ({
        ...acc,
        [next]: true,
    }), {} as Record<string, boolean>);
}
