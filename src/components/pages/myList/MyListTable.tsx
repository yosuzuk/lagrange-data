import { useEffect, memo } from 'react';
import { Table, ITableData, useTable, ITableColumn } from '../../table';
import { ShipDefinition } from '../../../types/ShipDefinition';
import { translateShipType, shipTypeToSortValue } from '../../../utils/shipTypeUtils';
import { translateShipRow, shipRowToSortValue } from '../../../utils/shipRowUtils';

const columns: ITableColumn<ShipDefinition>[] = [{
    id: 'name',
    renderHeader: () => '艦名',
    renderCell: (data: ShipDefinition) => data.name,
    sortFn: (a, b) => a.name.localeCompare(b.name),
}, {
    id: 'type',
    renderHeader: () => '艦種',
    renderCell: (data: ShipDefinition) => translateShipType(data.type, data.subType),
    sortFn: [
        (a, b) => shipTypeToSortValue(a.type, a.subType) - shipTypeToSortValue(b.type, b.subType),
        (a, b) => a.name.localeCompare(b.name),
    ],
    initialSortDirection: 'asc',
}, {
    id: 'row',
    renderHeader: () => '配置',
    renderCell: (data: ShipDefinition) => translateShipRow(data.row),
    sortFn: [
        (a, b) => shipRowToSortValue(a.row) - shipRowToSortValue(b.row),
        (a, b) => a.name.localeCompare(b.name),
    ],
}];

interface IProps {
    shipDefinitions: ShipDefinition[];
}

export const MyListTable = (props: IProps) => {
    const { shipDefinitions } = props;
    const { table, setTableData } = useTable<ShipDefinition>();

    useEffect(() => {
        const tableData: ITableData<ShipDefinition> = {
            columns,
            data: shipDefinitions,
            rowIdFn: (data: ShipDefinition) => data.id,
        };
        setTableData(tableData);
    }, [setTableData, shipDefinitions]);

    return (
        <Table table={table} size="small" />
    );
};

export const MemoizedMyListTable = memo(MyListTable);
