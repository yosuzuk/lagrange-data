import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { ShipDataTable } from './ShipDataTable';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState, applyShipFilter } from '../../filter/filterUtils';
import { ShipDataActionBar } from './ShipDataActionBar';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { createInitialColumnConfig } from '../../columns/columnConfigUtils';
import { IColumnConfig } from '../../columns/types/IColumnConfig';

export const ShipDataPage = () => {
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(createInitialShipFilterState);
    const [columnConfig, setColumnConfig] = useState<IColumnConfig>(createInitialColumnConfig);
    const filteredShipDefinitions = useMemo(() => applyShipFilter(shipDefinitions, shipFilter), [shipFilter]);

    return (
        <>
            <ShipDataActionBar
                shipFilter={shipFilter}
                columnConfig={columnConfig}
                onFilterChange={setShipFilter}
                onColumnConfigChange={setColumnConfig}
            />
            <Box p={1}>
                <ShipDataTable shipDefinitions={filteredShipDefinitions} columnConfig={columnConfig} />
            </Box>
        </>
    );
};
