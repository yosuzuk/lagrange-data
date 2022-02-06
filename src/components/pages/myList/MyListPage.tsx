import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { MyListActionBar } from './MyListActionBar';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState, extractPossesssedShips, extractUnwishedShips, extractWishedShips } from '../../filter/filterUtils';
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

    const shipList = useMemo<IShipListState>(() => ({
        possessed: extractPossesssedShips(shipDefinitions, userSettings.ships, shipFilter),
        wished: extractWishedShips(shipDefinitions, userSettings.ships, shipFilter),
        unwished: extractUnwishedShips(shipDefinitions, userSettings.ships, shipFilter),
    }), [userSettings, shipFilter]);

    const handleClickEdit = () => {
        navigate('/myList/edit');
    };

    const handleClickShare = () => {
        setShipsForShare(shipList);
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
                        possessedShips={shipList.possessed}
                        wishedShips={shipList.wished}
                        unwishedShips={shipList.unwished}
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
