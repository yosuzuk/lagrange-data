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
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { IColumnConfig } from '../../columns/types/IColumnConfig';
import { createInitialColumnConfig } from '../../columns/columnConfigUtils';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';

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
                columnConfig={columnConfig}
                onEdit={handleClickEdit}
                onFilter={setShipFilter}
                onShare={handleClickShare}
                onColumnConfigChange={setColumnConfig}
            />
            <Container disabled={Object.values(columnConfig).filter(set => typeof set === 'boolean' && set).length > 3}>
                <Box p={1}>
                    <Stack pt={1} pb={2} spacing={2}>
                        <Typography variant="body2">
                            {'マイリストでは艦船や追加システムの所有状態や「欲しい設計図」等を設定することが出来ます。'}
                        </Typography>
                        <Typography variant="body2">
                            {'所有状態を設定することで個人に合わせた細かい確率の計算が可能になります（サブモデルの確率や技術ポイントの確率が変動します）。'}
                        </Typography>
                        <Typography variant="body2">
                            {'欲しい設計図を設定するとそれらの合計確率がパイチャートで表示されるようになります。'}
                        </Typography>
                    </Stack>
                    <MyListView
                        shipListState={shipListState}
                        columnConfig={columnConfig}
                    />
                </Box>
            </Container>
            {shipsForShare && (
                <ShipsSharingDialog
                    ships={shipsForShare}
                    onClose={handleCloseShare}
                />
            )}
        </>
    );
};

export default MyListPage;
