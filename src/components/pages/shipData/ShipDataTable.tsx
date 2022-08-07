import { ReactNode, useEffect, useMemo } from 'react';
import { Table, ITableData, useTable, ITableColumn } from '../../table';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import {
    createShipNameLinkColumn,
    shipTypeColumn,
    shipRowColumn,
    shipCostColumn,
    shipOperationLimitColumn,
    shipSourceColumn,
    manufacturerColumn,
    researchManufacturerColumn,
    researchStrategyTypeColumn,
    researchTacticTypeColumn,
    shipWeightColumn,
    shipDpmShipColumn,
    shipDpmAntiAirColumn,
    shipDpmSiegeColumn,
    hpColumn,
    speedColumn,
    warpSpeedColumn,
} from '../../columns/colums';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';

interface IProps {
    shipDefinitions: IShipDefinition[];
    columnConfig: IColumnConfig;
    decorateName?: (name: ReactNode, data: IShipDefinition) => ReactNode;
}

export const ShipDataTable = (props: IProps) => {
    const { shipDefinitions, columnConfig, decorateName } = props;
    const { table, setTableData } = useTable<IShipDefinition>();

    const { openShipDetailDialog } = useShipDetail();

    const columns: ITableColumn<IShipDefinition>[] = useMemo(() => [
        createShipNameLinkColumn({
            onClick: openShipDetailDialog,
            decorateName,
        }),
        ...columnConfig.type ? [shipTypeColumn] : [],
        ...columnConfig.row ? [shipRowColumn] : [],
        ...columnConfig.cost ? [shipCostColumn] : [],
        ...columnConfig.operationLimit ? [shipOperationLimitColumn] : [],
        ...columnConfig.dpmShip ? [shipDpmShipColumn] : [],
        ...columnConfig.dpmAntiAir ? [shipDpmAntiAirColumn] : [],
        ...columnConfig.dpmSiege ? [shipDpmSiegeColumn] : [],
        ...columnConfig.hp ? [hpColumn] : [],
        ...columnConfig.speed ? [speedColumn] : [],
        ...columnConfig.warpSpeed ? [warpSpeedColumn] : [],
        ...columnConfig.source ? [shipSourceColumn] : [],
        ...columnConfig.manufacturer ? [manufacturerColumn] : [],
        ...columnConfig.researchManufacturer ? [researchManufacturerColumn] : [],
        ...columnConfig.researchStrategyType ? [researchStrategyTypeColumn] : [],
        ...columnConfig.researchTacticType ? [researchTacticTypeColumn] : [],
        ...columnConfig.weight ? [shipWeightColumn] : [],
    ], [columnConfig, decorateName, openShipDetailDialog]);

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
