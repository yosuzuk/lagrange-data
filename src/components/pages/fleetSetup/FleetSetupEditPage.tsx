import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetPropertiesEdit } from './FleetPropertiesEdit';
import { FleetSetupEditActionBar } from './FleetSetupEditActionBar';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';
import { useFleetEditor } from './hooks/useFleetEditor';
import { getFleetShipCount } from './utils/shipCounter';
import { FleetSetupBottomBar } from './FleetSetupBottomBar';

export const FleetSetupEditPage = () => {
    const navigate = useNavigate();
    const { fleetKey } = useParams();

    const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

    const {
        fleetSetup,
        errors,
        setFleetSetup,
        setShipCount,
        setCarriedShipCount,
        save,
        reset,
    } = useFleetEditor(fleetKey);

    const fleetShipCount = useMemo(() => getFleetShipCount(fleetSetup.ships), [fleetSetup.ships]);

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

    return (
        <>
            <NavigationBar currentRoute="/fleetSetup" />
            <FleetSetupEditActionBar
                onSave={handleClickSave}
                onCancel={handleClickCancel}
                onReset={handleClickReset}
                saveDisabled={Object.keys(errors).length > 0}
            />
            <Container>
                <Box p={1}>
                    <FleetPropertiesEdit
                        fleetSetup={fleetSetup}
                        onChange={setFleetSetup}
                        errors={errors}
                    />
                </Box>
            </Container>
            <FleetSetupBottomBar fleetSetup={fleetSetup} fleetShipCount={fleetShipCount} />
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
