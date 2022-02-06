import { useEffect, memo } from 'react';
import { Table, ITableData, useTable } from '../../table';
import { ShipDefinition } from '../../../types/ShipDefinition';
import { shipNameColumn, shipTypeColumn, shipRowColumn } from '../../columns/colums';

interface IProps {
    shipDefinitions: ShipDefinition[];
}

export const MyListTable = (props: IProps) => {
    const { shipDefinitions } = props;
    const { table, setTableData } = useTable<ShipDefinition>();

    useEffect(() => {
        const tableData: ITableData<ShipDefinition> = {
            columns: [
                shipNameColumn,
                shipTypeColumn,
                shipRowColumn,
            ],
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
