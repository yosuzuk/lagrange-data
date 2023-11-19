import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState, applyShipFilter } from '../../filter/filterUtils';
import { shipDefinitions as allShipDefinitions } from '../../../data/shipDefinitions';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { routes } from '../../../utils/routes';
import { TechPointConfigList } from './TechPointConfigList';
import { boolMapToArray, combineBoolMap } from '../../../utils/boolMapUtils';
import { TechPointConfigActionBar } from './TechPointConfigActionBar';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { useTechPointConfig } from './hooks/useTechPointConfig';
import { SearchInput } from '../../searchInput/SearchInput';
import { t } from '../../../i18n';
import { getShipName, sortShipDefinitionsByTypeAndName } from '../../../utils/shipDefinitionUtils';
import { IShipDefinition } from '../../../types/ShipDefinition';
import Typography from '@mui/material/Typography';
import { ShipId } from '../../../data/shipIds';

const supportedShipTypes: ShipType[] = [
    ShipType.AUXILIARY,
    ShipType.CARRIER,
    ShipType.BATTLE_CRUISER,
    ShipType.CRUISER,
    ShipType.CORVETTE,
];

// TODO remove when all fighters are supported
const additionallySupportedShipIds: string[] = [
    ShipId.AT021_A,
    ShipId.AT021_B,
    ShipId.AT021_C,
    ShipId.HAYREDDINGS_LOYAL,
    ShipId.MISTRAL,
    ShipId.SANDRAKE,
    ShipId.STINGRAY,
    ShipId.STRIX_A100,
    ShipId.VITAS_A021,
    ShipId.VITAS_B010,
    ShipId.BALANCER_ANDERSON,
];

export const TechPointConfigPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(() => combineBoolMap(searchParams.getAll('filter'), createInitialShipFilterState()));

    useEffect(() => {
        setSearchParams(routes.techPointConfig.createSearchParams({
            filter: boolMapToArray<ShipFilterState>(shipFilter),
        }));
    }, [shipFilter]);

    const shipDefinitions = useMemo(() => {
        return allShipDefinitions
            .filter(s => s.source === ShipSource.TECH_FILE || s.source === ShipSource.STARTER_SHIP)
            .filter(s => supportedShipTypes.includes(s.type) || additionallySupportedShipIds.includes(s.id));
    }, []);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredShipDefinitions = useMemo<IShipDefinition[]>(() => {
        const filtered = applyShipFilter(shipDefinitions, shipFilter);
        return sortShipDefinitionsByTypeAndName(filtered);
    }, [shipDefinitions, shipFilter]);

    const visibleShipDefinitions = useMemo<IShipDefinition[]>(() => {
        if (!searchTerm) {
            return filteredShipDefinitions;
        }
        return filteredShipDefinitions.filter(shipDefinition => getShipName(shipDefinition).toLowerCase().includes(searchTerm));
    }, [filteredShipDefinitions, searchTerm]);

    const {
        config,
        modified,
        stored,
        handleToggleModule,
        handleToggleEnhancement,
        handleToggleFavorite,
        handleReset,
        handleCancel,
        handleSave,
    } = useTechPointConfig({
        supportedShips: shipDefinitions,
        visibleShips: visibleShipDefinitions,
    });

    return (
        <>
            <NavigationBar currentRoute={routes.techPointConfig.path} />
            <TechPointConfigActionBar
                shipFilter={shipFilter}
                modified={modified}
                stored={stored}
                onFilterChange={setShipFilter}
                onReset={handleReset}
                onCancel={handleCancel}
                onSave={handleSave}
            />
            <PageContent>
                <Stack spacing={2} p={1}>
                    <Stack pt={1} pb={1} spacing={2}>
                        <Typography variant="body2">
                            {t('techPointConfig.pageDescription1')}
                        </Typography>
                        <Typography variant="body2">
                            {t('techPointConfig.pageDescription2')}
                        </Typography>
                        <Typography variant="body2">
                            {t('techPointConfig.pageDescription3')}
                        </Typography>
                    </Stack>
                    <SearchInput
                        id="searchShip"
                        lowerCase={true}
                        value={searchTerm}
                        placeholder={t('label.shipName')}
                        onChange={setSearchTerm}
                    />
                    <TechPointConfigList
                        config={config}
                        onToggleModule={handleToggleModule}
                        onToggleEnhancement={handleToggleEnhancement}
                        onToggleFavorite={handleToggleFavorite}
                    />
                </Stack>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default TechPointConfigPage;
