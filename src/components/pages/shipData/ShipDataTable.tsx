import { useEffect, useMemo } from 'react';
import { Table, ITableData, useTable, ITableColumn } from '../../table';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import { createShipNameLinkColumn, shipTypeColumn, shipRowColumn, shipCostColumn, shipOperationLimitColumn, shipSourceColumn, manufacturerColumn, shipWeightColumn } from '../../columns/colums';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';

interface IProps {
    shipDefinitions: IShipDefinition[];
    columnConfig: IColumnConfig;
}

export const ShipDataTable = (props: IProps) => {
    const { shipDefinitions, columnConfig } = props;
    const { table, setTableData } = useTable<IShipDefinition>();

    const { openShipDetailDialog } = useShipDetail();

    const columns: ITableColumn<IShipDefinition>[] = useMemo(() => [
        createShipNameLinkColumn({
            onClick: openShipDetailDialog
        }),
        ...columnConfig.type ? [shipTypeColumn] : [],
        ...columnConfig.row ? [shipRowColumn] : [],
        ...columnConfig.cost ? [shipCostColumn] : [],
        ...columnConfig.operationLimit ? [shipOperationLimitColumn] : [],
        ...columnConfig.source ? [shipSourceColumn] : [],
        ...columnConfig.manufacturer ? [manufacturerColumn] : [],
        ...columnConfig.weight ? [shipWeightColumn] : [],
    ], [columnConfig, openShipDetailDialog]);

    useEffect(() => {
        const tableData: ITableData<IShipDefinition> = {
            columns,
            data: shipDefinitions,
            rowIdFn: (data: IShipDefinition) => data.id,
        };
        setTableData(tableData);
    }, [setTableData, columns, shipDefinitions]);

    return (
        <Table table={table} size="small" />
    );
};
