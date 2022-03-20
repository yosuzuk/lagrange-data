import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
import { AddShipsToFleetDialog } from './AddShipsToFleetDialog';
import { ShipCountEditList } from './ShipCountEditList';
import { GroupAndSortOption, groupShipsBy } from './utils/shipGroupingUtils';
import { AddShipsButton } from './AddShipsButton';

export const FleetSetupEditPage = () => {
    const navigate = useNavigate();
    const { fleetKey } = useParams();

    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);

    const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

    const {
        fleetSetup,
        errors,
        shipWarnings,
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
        shipsForAddDialog,
        open: openAddDialog,
        cancel: cancelAddDialog,
        apply: applyAddDialog,
        setShipCount: setShipCountForAddDialog,
    } = useShipsForAddDialog({
        userSettings,
        fleetSetup,
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

    const groupDirection = largeScreen && groupedShips.groupedBy === GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME ? 'row' : 'column';
    const propertiesColumnCount = groupDirection === 'row' ? 4 : 2;

    return (
        <>
            <NavigationBar currentRoute="/fleetSetup" />
            <FleetSetupEditActionBar
                grouping={grouping}
                onChangeGrouping={setGrouping}
                onSave={handleClickSave}
                onCancel={handleClickCancel}
                onReset={handleClickReset}
                onOpenAddShips={openAddDialog}
                saveDisabled={Object.keys(errors).length > 0}
            />
            <Container disabled={groupDirection === 'row'}>
                <Box p={1}>
                    <Stack spacing={1}>
                        <FleetPropertiesEdit
                            fleetSetup={fleetSetup}
                            onChange={setFleetSetup}
                            errors={errors}
                            columnCount={propertiesColumnCount}
                        />
                        <Stack spacing={1} direction={groupDirection}>
                            {groupedShips.groups.map(group => (
                                <Paper
                                    key={group.id}
                                    sx={{ width: groupDirection === 'row' ? `${100 / groupedShips.groups.length}%` : undefined }}
                                >
                                    <Box p={1}>
                                        <Stack spacing={1}>
                                            <Stack
                                                spacing={1}
                                                direction="row"
                                                alignItems="center"
                                                sx={{ width: '100%' }}
                                            >
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="body1">
                                                        {`${group.name}${group.count > 0 ? `（${group.count}隻）` : ''}`}
                                                    </Typography>
                                                </Box>
                                                <AddShipsButton
                                                    filter={group.id}
                                                    onOpenAddShips={openAddDialog}
                                                />
                                            </Stack>
                                            {group.ships.length > 0 && (
                                                <ShipCountEditList
                                                    shipSelections={group.ships}
                                                    onChangeCount={setShipCount}
                                                    showCost={true}
                                                    showReinforcement={true}
                                                    shipWarnings={shipWarnings}
                                                />
                                            )}
                                        </Stack>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    </Stack>
                </Box>
            </Container>
            <FleetSetupBottomBar fleetSetup={fleetSetup} fleetShipCount={fleetShipCount} />
            {shipsForAddDialog && (
                <AddShipsToFleetDialog
                    ships={shipsForAddDialog}
                    onCancel={cancelAddDialog}
                    onApply={applyAddDialog}
                    onChangeCount={setShipCountForAddDialog}
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
