import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState, applyShipFilter } from '../../filter/filterUtils';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { routes } from '../../../utils/routes';
import { TechPointConfigList } from './TechPointConfigList';
import { boolMapToArray, combineBoolMap } from '../../../utils/boolMapUtils';
import { TechPointConfigActionBar } from './TechPointConfigActionBar';

export const TechPointConfigPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(() => combineBoolMap(searchParams.getAll('filter'), createInitialShipFilterState()));

    useEffect(() => {
        setSearchParams(routes.techPointConfig.createSearchParams({
            filter: boolMapToArray<ShipFilterState>(shipFilter),
        }));
    }, [shipFilter]);

    const filteredShipDefinitions = useMemo(() => applyShipFilter(shipDefinitions, shipFilter), [shipFilter]);

    return (
        <>
            <NavigationBar currentRoute={routes.techPointConfig.path} />
            <TechPointConfigActionBar
                shipFilter={shipFilter}
                onFilterChange={setShipFilter}
            />
            <PageContent>
                <Box component="div" p={1}>
                    <TechPointConfigList shipDefinitions={filteredShipDefinitions} />
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default TechPointConfigPage;
