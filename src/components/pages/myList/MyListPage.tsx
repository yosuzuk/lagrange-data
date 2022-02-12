import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { MyListActionBar } from './MyListActionBar';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { applyShipFilter, createInitialShipFilterState, extractPossesssedShips, extractUnwishedShipsByUser, extractUnwishedShipsByData, extractWishedShips } from '../../filter/filterUtils';
import { UserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { MyListView } from './MyListView';
import { ShipsSharingDialog } from './ShipsSharingDialog';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { IShipListState } from './types/IShipListState';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';

export const MyListPage = () => {
    const navigate = useNavigate();

    const userSettings = useMemo<UserSettings>(() => getCurrentUserSettings(), []);
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(createInitialShipFilterState);
    const [shipsForShare, setShipsForShare] = useState<IShipListState | null>(null);

    const shipListState = useMemo<IShipListState>(() => {
        const filteredShipDefinitions = applyShipFilter(shipDefinitions, shipFilter);
        return {
            possessed: extractPossesssedShips(filteredShipDefinitions, userSettings.ships),
            wished: extractWishedShips(filteredShipDefinitions, userSettings.ships),
            unwishedByUser: extractUnwishedShipsByUser(filteredShipDefinitions, userSettings.ships),
            unwishedByData: extractUnwishedShipsByData(filteredShipDefinitions, userSettings.ships),
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

    return (
        <>
            <NavigationBar currentRoute="/myList" />
            <MyListActionBar
                shipFilter={shipFilter}
                onEdit={handleClickEdit}
                onFilter={setShipFilter}
                onShare={handleClickShare}
            />
            <Container>
                <Box p={1}>
                    <MyListView
                        shipListState={shipListState}
                    />
                </Box>
            </Container>
            {shipsForShare && (
                <ShipsSharingDialog
                    ships={shipsForShare}
                    open={true}
                    onClose={handleCloseShare}
                />
            )}
        </>
    );
};

export default MyListPage;
