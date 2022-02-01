import { IColumnConfig, IColumnConfigOption } from './types/IColumnConfig';

export function createInitialColumnConfig(): IColumnConfig {
    return {
        type: true,
        row: true,
        cost: false,
        operationLimit: false,
        source: false,
        weight: false,
    };
}

export function createColumnConfigOptions(): IColumnConfigOption[] {
    return [
        {
            columnKey: 'type',
            name: '艦種',
        },
        {
            columnKey: 'row',
            name: '配置',
        },
        {
            columnKey: 'cost',
            name: 'コスト',
        },
        {
            columnKey: 'operationLimit',
            name: '稼働上限',
        },
        {
            columnKey: 'source',
            name: '入手方法',
        },
        {
            columnKey: 'weight',
            name: '確率の重み',
        },
    ];
}
