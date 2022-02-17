import { useEffect, memo } from 'react';
import { Table, ITableData, useTable } from '../../table';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { shipNameColumn, shipTypeColumn, shipRowColumn } from '../../columns/colums';

interface IProps {
    shipDefinitions: IShipDefinition[];
}

export const MyListTable = (props: IProps) => {
    const { shipDefinitions } = props;
    const { table, setTableData } = useTable<IShipDefinition>();

    useEffect(() => {
        const tableData: ITableData<IShipDefinition> = {
            columns: [
                shipNameColumn,
                shipTypeColumn,
                shipRowColumn,
            ],
            data: shipDefinitions,
            rowIdFn: (data: IShipDefinition) => data.id,
        };
        setTableData(tableData);
    }, [setTableData, shipDefinitions]);

    return (
        <Table table={table} size="small" />
    );
};

export const MemoizedMyListTable = memo(MyListTable);
