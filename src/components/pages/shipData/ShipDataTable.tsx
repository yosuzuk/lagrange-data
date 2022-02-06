import { useEffect, useMemo } from 'react';
import { Table, ITableData, useTable, ITableColumn } from '../../table';
import { ShipDefinition } from '../../../types/ShipDefinition';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import { shipNameColumn, shipTypeColumn, shipRowColumn, shipCostColumn, shipOperationLimitColumn, shipSourceColumn, shipWeightColumn } from '../../columns/colums';

interface IProps {
    shipDefinitions: ShipDefinition[];
    columnConfig: IColumnConfig;
}

export const ShipDataTable = (props: IProps) => {
    const { shipDefinitions, columnConfig } = props;
    const { table, setTableData } = useTable<ShipDefinition>();

    const columns: ITableColumn<ShipDefinition>[] = useMemo(() => [
        shipNameColumn,
        ...columnConfig.type ? [shipTypeColumn] : [],
        ...columnConfig.row ? [shipRowColumn] : [],
        ...columnConfig.cost ? [shipCostColumn] : [],
        ...columnConfig.operationLimit ? [shipOperationLimitColumn] : [],
        ...columnConfig.source ? [shipSourceColumn] : [],
        ...columnConfig.weight ? [shipWeightColumn] : [],
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
