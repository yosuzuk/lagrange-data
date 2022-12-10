export function alignRecordIds<T extends Record<string, { id: string }>>(records: T): T {
    return Object.keys(records).reduce((acc, next) => ({
        ...acc,
        [next]: {
            ...records[next],
            id: next,
        },
    }), {} as T);
}
