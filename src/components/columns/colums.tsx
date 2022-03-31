import Typography from '@mui/material/Typography';
import { ScriptedLink } from '../link/ScriptedLink';
import { IShipDefinition } from '../../types/ShipDefinition';
import { translateShipRow, shipRowToSortValue } from '../../utils/shipRowUtils';
import { translateShipSource, shipSourceToSortValue } from '../../utils/shipSourceUtils';
import { translateShipType, shipTypeToSortValue } from '../../utils/shipTypeUtils';
import { ITableColumn } from '../table';
import { manufacturerToSortValue, translateManufacturer } from '../../utils/manufacturerUtils';

export const shipNameColumn: ITableColumn<IShipDefinition> = {
    id: 'name',
    renderHeader: () => '艦名',
    renderCell: (data: IShipDefinition) => data.name,
    sortFn: (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
};

interface IShipNameColumnOptions {
    onClick: (shipId: string) => void;
}

export const createShipNameLinkColumn = (options: IShipNameColumnOptions): ITableColumn<IShipDefinition> => ({
    id: 'nameLink',
    renderHeader: () => '艦名',
    renderCell: (data: IShipDefinition) => (
        <Typography variant="body2">
            <ScriptedLink
                onClick={() => {
                    options.onClick(data.id);
                }}
            >
                {data.name}
            </ScriptedLink>
        </Typography>
    ),
    sortFn: (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
});

export const shipTypeColumn: ITableColumn<IShipDefinition> = {
    id: 'type',
    renderHeader: () => '艦種',
    renderCell: (data: IShipDefinition) => translateShipType(data.type, data.subType),
    sortFn: [
        (a, b) => shipTypeToSortValue(a.type, a.subType) - shipTypeToSortValue(b.type, b.subType),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
    initialSortDirection: 'asc',
};

export const shipRowColumn: ITableColumn<IShipDefinition> = {
    id: 'row',
    renderHeader: () => '配置',
    renderCell: (data: IShipDefinition) => translateShipRow(data.row),
    sortFn: [
        (a, b) => shipRowToSortValue(a.row) - shipRowToSortValue(b.row),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipCostColumn: ITableColumn<IShipDefinition> = {
    id: 'cost',
    renderHeader: () => 'コスト',
    renderCell: (data: IShipDefinition) => data.cost,
    sortFn: [
        (a, b) => a.cost - b.cost,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipOperationLimitColumn: ITableColumn<IShipDefinition> = {
    id: 'operationLimit',
    renderHeader: () => '稼働上限',
    renderCell: (data: IShipDefinition) => data.operationLimit,
    sortFn: [
        (a, b) => a.operationLimit - b.operationLimit,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipSourceColumn: ITableColumn<IShipDefinition> = {
    id: 'source',
    renderHeader: () => '入手方法',
    renderCell: (data: IShipDefinition) => translateShipSource(data.source),
    sortFn: [
        (a, b) => shipSourceToSortValue(a.source) - shipSourceToSortValue(b.source),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const manufacturerColumn: ITableColumn<IShipDefinition> = {
    id: 'manufacturer',
    renderHeader: () => '製造元',
    renderCell: (data: IShipDefinition) => translateManufacturer(data.manufacturer),
    sortFn: [
        (a, b) => manufacturerToSortValue(a.manufacturer) - manufacturerToSortValue(b.manufacturer),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipWeightColumn: ITableColumn<IShipDefinition> = {
    id: 'weight',
    renderHeader: () => '重み',
    renderCell: (data: IShipDefinition) => data.weight,
    sortFn: [
        (a, b) => a.weight - b.weight,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};
