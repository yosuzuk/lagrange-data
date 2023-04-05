import { ReactNode, useEffect, useMemo } from 'react';
import { Table, ITableData, useTable, ITableColumn, SortDirection } from '../../table';
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
    armorColumn,
    shieldColumn,
    speedColumn,
    warpSpeedColumn,
    shipDpmShipPerCommandPointColumn,
    shipDpmAntiAirPerCommandPointColumn,
    shipDpmSiegePerCommandPointColumn,
    hpPerCommandPointColumn,
} from '../../columns/colums';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';

interface IProps {
    shipDefinitions: IShipDefinition[];
    columnConfig: IColumnConfig;
    decorateName?: (name: ReactNode, data: IShipDefinition) => ReactNode;
    initialSorting?: [string | null, SortDirection];
    onChangeSorting?: (sorting: [string | null, SortDirection]) => void;
}

export const ShipDataTable = (props: IProps) => {
    const { shipDefinitions, columnConfig, decorateName, initialSorting, onChangeSorting } = props;
    const { table, setTableData } = useTable<IShipDefinition>({ initialSorting, onChangeSorting });

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
        ...columnConfig.armor ? [armorColumn] : [],
        ...columnConfig.shield ? [shieldColumn] : [],
        ...columnConfig.speed ? [speedColumn] : [],
        ...columnConfig.warpSpeed ? [warpSpeedColumn] : [],
        ...columnConfig.dpmShipPerCommandPoint ? [shipDpmShipPerCommandPointColumn] : [],
        ...columnConfig.dpmAntiAirPerCommandPoint ? [shipDpmAntiAirPerCommandPointColumn] : [],
        ...columnConfig.dpmSiegePerCommandPoint ? [shipDpmSiegePerCommandPointColumn] : [],
        ...columnConfig.hpPerCommandPoint ? [hpPerCommandPointColumn] : [],
        ...columnConfig.source ? [shipSourceColumn] : [],
        ...columnConfig.manufacturer ? [manufacturerColumn] : [],
        ...columnConfig.researchManufacturer ? [researchManufacturerColumn] : [],
        ...columnConfig.researchTacticType ? [researchTacticTypeColumn] : [],
        ...columnConfig.researchStrategyType ? [researchStrategyTypeColumn] : [],
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
