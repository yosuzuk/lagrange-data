export type SortFn<TData> = (a: TData, b: TData) => number;

export type SortDirection = 'asc' | 'desc' | null;

export function normalizeSortFn<TData>(sortFn: SortFn<TData> | SortFn<TData>[]): SortFn<TData> {
    if (Array.isArray(sortFn)) {
        return (a: TData, b: TData) => (sortFn as SortFn<TData>[])
            .reduce((result: number, nextSortFn: SortFn<TData>) => result !== 0 ? result : nextSortFn(a, b), 0);
    }

    return sortFn;
}
