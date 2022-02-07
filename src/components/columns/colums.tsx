import Typography from '@mui/material/Typography';
import { ShipDefinition } from '../../types/ShipDefinition';
import { translateShipRow, shipRowToSortValue } from '../../utils/shipRowUtils';
import { translateShipSource, shipSourceToSortValue } from '../../utils/shipSourceUtils';
import { translateShipType, shipTypeToSortValue } from '../../utils/shipTypeUtils';
import { ITableColumn } from '../table';

export const shipNameColumn: ITableColumn<ShipDefinition> = {
    id: 'name',
    renderHeader: () => '艦名',
    renderCell: (data: ShipDefinition) => data.name,
    sortFn: (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
};

export const shipTypeColumn: ITableColumn<ShipDefinition> = {
    id: 'type',
    renderHeader: () => '艦種',
    renderCell: (data: ShipDefinition) => translateShipType(data.type, data.subType),
    sortFn: [
        (a, b) => shipTypeToSortValue(a.type, a.subType) - shipTypeToSortValue(b.type, b.subType),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
    initialSortDirection: 'asc',
};

export const shipRowColumn: ITableColumn<ShipDefinition> = {
    id: 'row',
    renderHeader: () => '配置',
    renderCell: (data: ShipDefinition) => translateShipRow(data.row),
    sortFn: [
        (a, b) => shipRowToSortValue(a.row) - shipRowToSortValue(b.row),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipCostColumn: ITableColumn<ShipDefinition> = {
    id: 'cost',
    renderHeader: () => 'コスト',
    renderCell: (data: ShipDefinition) => data.cost,
    sortFn: [
        (a, b) => a.cost - b.cost,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipOperationLimitColumn: ITableColumn<ShipDefinition> = {
    id: 'operationLimit',
    renderHeader: () => '稼働上限',
    renderCell: (data: ShipDefinition) => data.operationLimit,
    sortFn: [
        (a, b) => a.operationLimit - b.operationLimit,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipSourceColumn: ITableColumn<ShipDefinition> = {
    id: 'source',
    renderHeader: () => '入手方法',
    renderCell: (data: ShipDefinition) => translateShipSource(data.source),
    sortFn: [
        (a, b) => shipSourceToSortValue(a.source) - shipSourceToSortValue(b.source),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipWeightColumn: ITableColumn<ShipDefinition> = {
    id: 'weight',
    renderHeader: () => '重み',
    renderCell: (data: ShipDefinition) => data.weight,
    sortFn: [
        (a, b) => a.weight - b.weight,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};
