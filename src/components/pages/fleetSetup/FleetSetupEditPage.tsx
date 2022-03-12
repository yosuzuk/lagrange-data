import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetPropertiesEdit } from './FleetPropertiesEdit';
import { FleetSetupEditActionBar } from './FleetSetupEditActionBar';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';
import { useFleetEditor } from './hooks/useFleetEditor';
import { FleetNameDialog } from './FleetNameDialog';

export const FleetSetupEditPage = () => {
    const navigate = useNavigate();
    const { fleetKey } = useParams();

    const [renaming, setRenaming] = useState<boolean>(false);
    const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

    const {
        fleetSetup,
        setFleetName,
        setShipCount,
        setCarriedShipCount,
        save,
        reset,
    } = useFleetEditor(fleetKey);

    const handleStartRenaming = () => {
        setRenaming(true);
    };

    const handleConfirmRenaming = (newName: string) => {
        setRenaming(false);
        setFleetName(newName);
    };

    const cancelRenaming = () => {
        setRenaming(false);
    };

    const handleClickCancel = () => {
        navigate('/fleetSetup');
    };

    const handleClickSave = () => {
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
            />
            <Container>
                <Box p={1}>
                    <FleetPropertiesEdit fleetSetup={fleetSetup} onStartRenaming={handleStartRenaming} />
                </Box>
            </Container>
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
            {renaming && (
                <FleetNameDialog
                    fleetName={fleetSetup.name}
                    onCancel={cancelRenaming}
                    onConfirm={handleConfirmRenaming}
                />
            )}
        </>
    );
}

export default FleetSetupEditPage;
