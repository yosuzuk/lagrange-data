import { ITableColumn } from "../table/types/ITable";

export interface IExampleData {
    id: string;
    property1: string;
    property2: number;
    property3: string;
    property4: string;
}

export function createExampleColumns(): ITableColumn<IExampleData>[] {
    return [{
        id: 'property1',
        renderCell: (data: IExampleData) => data.property1,
        renderHeader: () => 'Property1',
        initialSortDirection: 'asc',
        sortFn: (a, b) => a.property1.localeCompare(b.property1),
    }, {
        id: 'property2',
        renderCell: (data: IExampleData) => data.property2,
        renderHeader: () => 'Property2',
        sortFn: (a, b) => a.property2 - b.property2,
    }, {
        id: 'property3',
        renderCell: (data: IExampleData) => data.property3,
        renderHeader: () => 'Property3',
        sortFn: (a, b) => a.property3.localeCompare(b.property3),
    }];
}

export function createArrayOfExampleData(): IExampleData[] {
    return [
        {
            id: 'data1',
            property1: 'abc',
            property2: 42,
            property3: 'def',
            property4: '...',
        },
        {
            id: 'data2',
            property1: 'def',
            property2: 45,
            property3: 'ghi',
            property4: '...',
        },
        {
            id: 'data3',
            property1: 'ghi',
            property2: 36,
            property3: 'jkl',
            property4: '...',
        },
    ];
}
