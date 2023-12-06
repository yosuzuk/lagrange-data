import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ShipDataTable } from './ShipDataTable';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState, applyShipFilter } from '../../filter/filterUtils';
import { ShipDataActionBar } from './ShipDataActionBar';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { createInitialColumnConfig } from '../../columns/columnConfigUtils';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { routes } from '../../../utils/routes';
import { SortDirection } from '../../../utils/sortingUtils';
import { boolMapToArray, combineBoolMap } from '../../../utils/boolMapUtils';
import { ShipTag } from '../../../types/ShipTag';

export const ShipDataPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(() => combineBoolMap(searchParams.getAll('filter'), createInitialShipFilterState()));
    const [columnConfig, setColumnConfig] = useState<IColumnConfig>(() => combineBoolMap(searchParams.getAll('columns'), createInitialColumnConfig({
        name: true,
        row: true,
        type: true,
        cost: true,
        operationLimit: true,
    })));

    const [sorting, setSorting] = useState<[string | null, SortDirection]>([
        searchParams.get('sortBy') ?? 'type',
        searchParams.get('sortDirection') as (SortDirection | null) ?? 'asc',
    ]);

    useEffect(() => {
        setSearchParams(routes.shipData.createSearchParams({
            filter: boolMapToArray<ShipFilterState>(shipFilter),
            columns: boolMapToArray<IColumnConfig>(columnConfig),
            sortBy: sorting[0] ?? null,
            sortDirection: sorting[1] ?? 'asc',
        }));
    }, [shipFilter, columnConfig, sorting]);

    const filteredShipDefinitions = useMemo(() => {
        return applyShipFilter(shipDefinitions, shipFilter).filter(shipDefinition => {
            return shipDefinition.tags?.includes(ShipTag.CURRENTLY_UNOBTAINABLE) !== true;
        });
    }, [shipFilter]);

    const disableContainer = Object.values(columnConfig).filter(set => set).length > 3;

    return (
        <>
            <NavigationBar currentRoute="/shipData" />
            <ShipDataActionBar
                shipFilter={shipFilter}
                columnConfig={columnConfig}
                onFilterChange={setShipFilter}
                onColumnConfigChange={setColumnConfig}
            />
            <PageContent disableContainer={disableContainer}>
                <Box component="div" p={1}>
                    <ShipDataTable
                        shipDefinitions={filteredShipDefinitions}
                        columnConfig={columnConfig}
                        initialSorting={sorting}
                        onChangeSorting={setSorting}
                    />
                </Box>
            </PageContent>
            <PageFooter disableContainer={disableContainer} />
        </>
    );
};

export default ShipDataPage;
