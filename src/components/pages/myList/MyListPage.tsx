import { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MyListActionBar } from './MyListActionBar';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { applyShipFilter, createInitialShipFilterState, extractPossesssedShips, extractUnwishedShipsByUser, extractUnwishedShipsByData, extractWishedShips } from '../../filter/filterUtils';
import { MyListView } from './MyListView';
import { ShipsSharingDialog } from './ShipsSharingDialog';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { IShipListState } from './types/IShipListState';
import { NavigationBar } from '../../navigation/NavigationBar';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import { createInitialColumnConfig } from '../../columns/columnConfigUtils';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { t } from '../../../i18n';

export const MyListPage = () => {
    const navigate = useNavigate();

    const { userSettings } = useUserSettings();
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(createInitialShipFilterState);
    const [shipsForShare, setShipsForShare] = useState<IShipListState | null>(null);

    const [columnConfig, setColumnConfig] = useState<IColumnConfig>(() => createInitialColumnConfig({
        name: true,
        row: true,
        type: true,
        cost: false,
        operationLimit: false,
    }));

    const shipListState = useMemo<IShipListState>(() => {
        const filteredShipDefinitions = applyShipFilter(shipDefinitions, shipFilter);
        return {
            possessed: extractPossesssedShips(filteredShipDefinitions, userSettings.ships),
            wished: extractWishedShips(filteredShipDefinitions, userSettings),
            unwishedByUser: extractUnwishedShipsByUser(filteredShipDefinitions, userSettings.ships),
            unwishedByData: extractUnwishedShipsByData(filteredShipDefinitions, userSettings),
        };
    }, [userSettings, shipFilter]);

    const handleClickEdit = () => {
        navigate('/myList/edit');
    };

    const handleClickShare = () => {
        setShipsForShare(shipListState);
    };

    const handleCloseShare = () => {
        setShipsForShare(null);
    };

    const disableContainer = Object.values(columnConfig).filter(set => typeof set === 'boolean' && set).length > 3;

    return (
        <>
            <NavigationBar currentRoute="/myList" />
            <MyListActionBar
                shipFilter={shipFilter}
                columnConfig={columnConfig}
                onEdit={handleClickEdit}
                onFilter={setShipFilter}
                onCopyAsText={handleClickShare}
                onColumnConfigChange={setColumnConfig}
            />
            <PageContent disableContainer={disableContainer}>
                <Box component="div" p={1}>
                    <Stack pt={1} pb={2} spacing={2}>
                        <Typography variant="body2">
                            {t('myList.pageDescription1')}
                        </Typography>
                        <Typography variant="body2">
                            {t('myList.pageDescription2')}
                        </Typography>
                        <Typography variant="body2">
                            {t('myList.pageDescription3')}
                        </Typography>
                    </Stack>
                    <MyListView
                        shipListState={shipListState}
                        columnConfig={columnConfig}
                    />
                </Box>
            </PageContent>
            {shipsForShare && (
                <ShipsSharingDialog
                    ships={shipsForShare}
                    onClose={handleCloseShare}
                />
            )}
            <PageFooter disableContainer={disableContainer} />
        </>
    );
};

export default MyListPage;
