import { useMemo, useState, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetPropertiesEdit } from './FleetPropertiesEdit';
import { FleetSetupEditActionBar } from './FleetSetupEditActionBar';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';
import { useFleetEditor } from './hooks/useFleetEditor';
import { getFleetShipCount } from './utils/shipCounter';
import { FleetSetupBottomBar } from './FleetSetupBottomBar';
import { useShipsForAddDialog } from './hooks/useShipsForAddDialog';
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { AddShipsToFleetDialog } from './AddShipsToFleetDialog';
import { extractShipDefinitionsForAddDialog } from './utils/shipAddDialogUtilts';
import { ShipCountList } from './ShipCountList';
import { GroupAndSortOption, groupShipsBy } from './utils/shipGroupingUtils';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { AddShipsButton } from './AddShipsButton';

const MemoizedShipCountList = memo(ShipCountList);

export const FleetSetupEditPage = () => {
    const navigate = useNavigate();
    const { fleetKey } = useParams();

    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
    const shipDefinitionsForAddDialog = useMemo(() => extractShipDefinitionsForAddDialog(shipDefinitions, userSettings), [userSettings]);

    const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

    const {
        fleetSetup,
        errors,
        setFleetSetup,
        setShipCount,
        setCarriedShipCount,
        save,
        reset,
    } = useFleetEditor({
        initialFleetKey: fleetKey,
        userSettings,
    });

    const {
        shipsForAddDialog: shipsForInitialShipsAddDialog,
        open: openAddNewInitialShips,
        cancel: cancelAddNewInitialShips,
        apply: applyNewInitialShips,
        setShipCount: setShipCountForInitialShips,
    } = useShipsForAddDialog({
        userSettings,
        fleetSetup,
        reinforcement: null,
        shipDefinitions: shipDefinitionsForAddDialog.myListShips,
        setFleetSetup,
    });

    const {
        shipsForAddDialog: shipsForSelfReinforcementAddDialog,
        open: openAddNewSelfReinforcement,
        cancel: cancelAddNewSelfReinforcement,
        apply: applyNewSelfReinforcement,
        setShipCount: setShipCountForSelfReinforcement,
    } = useShipsForAddDialog({
        userSettings,
        fleetSetup,
        reinforcement: 'self',
        shipDefinitions: shipDefinitionsForAddDialog.myListShips,
        setFleetSetup,
    });

    const {
        shipsForAddDialog: shipsForAllyReinforcementAddDialog,
        open: openAddNewAllyReinforcement,
        cancel: cancelAddNewAllyReinforcement,
        apply: applyNewAllyReinforcement,
        setShipCount: setShipCountForAllyReinforcement,
    } = useShipsForAddDialog({
        userSettings,
        fleetSetup,
        reinforcement: 'ally',
        shipDefinitions: shipDefinitionsForAddDialog.allyReinforcementShips,
        setFleetSetup,
    });

    const fleetShipCount = useMemo(() => getFleetShipCount(fleetSetup.ships), [fleetSetup.ships]);

    const [grouping, setGrouping] = useState<string>(GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME);
    const groupedShips = useMemo(() => groupShipsBy(grouping, fleetSetup), [fleetSetup, grouping]);

    const handleClickCancel = () => {
        navigate('/fleetSetup');
    };

    const handleClickSave = () => {
        if (Object.keys(errors).length > 0) {
            return;
        }
        save();
        navigate('/fleetSetup');
    };

    const handleCancelReset = () => {
        setConfirmingReset(false);
    };

    const handleClickReset = () => {
        setConfirmingReset(true);
    };

    const handleConfirmReset = () => {
        setConfirmingReset(false);
        reset();
    };

    const addShipsDisabled = fleetShipCount.totalCost >= fleetSetup.maxCost;
    const addReinforcementDisabled = fleetSetup.totalReinforcementCount >= fleetSetup.maxReinforcement;

    return (
        <>
            <NavigationBar currentRoute="/fleetSetup" />
            <FleetSetupEditActionBar
                grouping={grouping}
                onChangeGrouping={setGrouping}
                onSave={handleClickSave}
                onCancel={handleClickCancel}
                onReset={handleClickReset}
                onOpenAddShips={openAddNewInitialShips}
                onOpenAddSelfReinforcement={openAddNewSelfReinforcement}
                onOpenAddAllyReinforcement={openAddNewAllyReinforcement}
                addShipsDisabled={addShipsDisabled}
                addReinforcementDisabled={addReinforcementDisabled}
                saveDisabled={Object.keys(errors).length > 0}
            />
            <Container>
                <Box p={1}>
                    <Stack spacing={2}>
                        <FleetPropertiesEdit
                            fleetSetup={fleetSetup}
                            onChange={setFleetSetup}
                            errors={errors}
                        />
                        <ExpandStack
                            key={groupedShips.groupedBy}
                            expandables={groupedShips.groups.map(group => ({
                                id: group.id,
                                initiallyOpened: true,
                                summary: (
                                    <Stack
                                        spacing={1}
                                        direction="row"
                                        alignItems="center"
                                        sx={{ width: '100%' }}
                                    >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body1">
                                                {group.name}
                                            </Typography>
                                        </Box>
                                        <Box pr={2}>
                                            <AddShipsButton
                                                groupId={group.id}
                                                onOpenAddShips={openAddNewInitialShips}
                                                onOpenAddSelfReinforcement={openAddNewSelfReinforcement}
                                                onOpenAddAllyReinforcement={openAddNewAllyReinforcement}
                                                addShipsDisabled={addShipsDisabled}
                                                addReinforcementDisabled={addReinforcementDisabled}
                                            />
                                        </Box>
                                    </Stack>
                                ),
                                details: (
                                    <MemoizedShipCountList
                                        shipSelections={group.ships}
                                        onChangeCount={setShipCount}
                                        showCost={true}
                                        showReinforcement={true}
                                    />
                                ),
                            }))}
                        />
                    </Stack>
                </Box>
            </Container>
            <FleetSetupBottomBar fleetSetup={fleetSetup} fleetShipCount={fleetShipCount} />
            {shipsForInitialShipsAddDialog && (
                <AddShipsToFleetDialog
                    title={'艦船を追加'}
                    description={'艦船を通常配備します。所持している艦船はマイリストで設定してください。'}
                    ships={shipsForInitialShipsAddDialog}
                    reinforcement={null}
                    onCancel={cancelAddNewInitialShips}
                    onApply={applyNewInitialShips}
                    onChangeCount={setShipCountForInitialShips}
                />
            )}
            {shipsForSelfReinforcementAddDialog && (
                <AddShipsToFleetDialog
                    title={'増援を追加'}
                    description={'自身の基地から送る増援を追加します。所持している艦船はマイリストで設定してください。'}
                    ships={shipsForSelfReinforcementAddDialog}
                    reinforcement={'self'}
                    onCancel={cancelAddNewSelfReinforcement}
                    onApply={applyNewSelfReinforcement}
                    onChangeCount={setShipCountForSelfReinforcement}
                />
            )}
            {shipsForAllyReinforcementAddDialog && (
                <AddShipsToFleetDialog
                    title={'増援を追加'}
                    description={'ユニオンメンバーから送られる増援を追加します。'}
                    ships={shipsForAllyReinforcementAddDialog}
                    reinforcement={'ally'}
                    onCancel={cancelAddNewAllyReinforcement}
                    onApply={applyNewAllyReinforcement}
                    onChangeCount={setShipCountForAllyReinforcement}
                />
            )}
            {confirmingReset && (
                <ConfirmationDialog
                    title={'初期化'}
                    question={'艦隊を初期状態に戻しますか？'}
                    cancelText={'キャンセル'}
                    confirmText={'初期化'}
                    onCancel={handleCancelReset}
                    onConfirm={handleConfirmReset}
                />
            )}
        </>
    );
}

export default FleetSetupEditPage;
