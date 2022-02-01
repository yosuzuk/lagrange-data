import { useEffect, useMemo } from 'react';
import { Table, ITableData, useTable, ITableColumn } from '../../table';
import { ShipDefinition } from '../../../types/ShipDefinition';
import { translateShipType, shipTypeToSortValue } from '../../../utils/shipTypeUtils';
import { translateShipRow, shipRowToSortValue } from '../../../utils/shipRowUtils';
import { translateShipSource, shipSourceToSortValue } from '../../../utils/shipSourceUtils';
import { IColumnConfig } from '../../columns/types/IColumnConfig';

const nameColumn: ITableColumn<ShipDefinition> = {
    id: 'name',
    renderHeader: () => '艦名',
    renderCell: (data: ShipDefinition) => data.name,
    sortFn: (a, b) => a.name.localeCompare(b.name),
    initialSortDirection: 'asc',
};

const typeColumn: ITableColumn<ShipDefinition> = {
    id: 'type',
    renderHeader: () => '艦種',
    renderCell: (data: ShipDefinition) => translateShipType(data.type, data.subType),
    sortFn: [
        (a, b) => shipTypeToSortValue(a.type, a.subType) - shipTypeToSortValue(b.type, b.subType),
        (a, b) => a.name.localeCompare(b.name),
    ],
};

const rowColumn: ITableColumn<ShipDefinition> = {
    id: 'row',
    renderHeader: () => '配置',
    renderCell: (data: ShipDefinition) => translateShipRow(data.row),
    sortFn: [
        (a, b) => shipRowToSortValue(a.row) - shipRowToSortValue(b.row),
        (a, b) => a.name.localeCompare(b.name),
    ],
};

const costColumn: ITableColumn<ShipDefinition> = {
    id: 'cost',
    renderHeader: () => 'コスト',
    renderCell: (data: ShipDefinition) => data.cost,
    sortFn: [
        (a, b) => a.cost - b.cost,
        (a, b) => a.name.localeCompare(b.name),
    ],
};

const operationLimitColumn: ITableColumn<ShipDefinition> = {
    id: 'operationLimit',
    renderHeader: () => '稼働上限',
    renderCell: (data: ShipDefinition) => data.operationLimit,
    sortFn: [
        (a, b) => a.operationLimit - b.operationLimit,
        (a, b) => a.name.localeCompare(b.name),
    ],
};

const sourceColumn: ITableColumn<ShipDefinition> = {
    id: 'source',
    renderHeader: () => '入手方法',
    renderCell: (data: ShipDefinition) => translateShipSource(data.source),
    sortFn: [
        (a, b) => shipSourceToSortValue(a.source) - shipSourceToSortValue(b.source),
        (a, b) => a.name.localeCompare(b.name),
    ],
};

const weightColumn: ITableColumn<ShipDefinition> = {
    id: 'weight',
    renderHeader: () => '重み',
    renderCell: (data: ShipDefinition) => data.weight,
    sortFn: [
        (a, b) => a.weight - b.weight,
        (a, b) => a.name.localeCompare(b.name),
    ],
};

interface IProps {
    shipDefinitions: ShipDefinition[];
    columnConfig: IColumnConfig;
}

export const ShipDataTable = (props: IProps) => {
    const { shipDefinitions, columnConfig } = props;
    const { table, setTableData } = useTable<ShipDefinition>();

    const columns: ITableColumn<ShipDefinition>[] = useMemo(() => [
        nameColumn,
        ...columnConfig.type ? [typeColumn] : [],
        ...columnConfig.row ? [rowColumn] : [],
        ...columnConfig.cost ? [costColumn] : [],
        ...columnConfig.operationLimit ? [operationLimitColumn] : [],
        ...columnConfig.source ? [sourceColumn] : [],
        ...columnConfig.weight ? [weightColumn] : [],
    ], [columnConfig]);

    useEffect(() => {
        const tableData: ITableData<ShipDefinition> = {
            columns,
            data: shipDefinitions,
            rowIdFn: (data: ShipDefinition) => data.id,
        };
        setTableData(tableData);
    }, [setTableData, columns, shipDefinitions]);

    return (
        <Table table={table} size="small" />
    );
};
