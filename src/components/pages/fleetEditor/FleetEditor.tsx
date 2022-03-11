import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useFleetEditor } from './hooks/useFleetEditor';
import { FleetSelection } from './FleetSelection';
import { FleetNameDialog } from './FleetNameDialog';

export const FleetEditor = () => {
    const [renaming, setRenaming] = useState<boolean>(false);

    const {
        fleetSetups,
        fleetSetup,
        switchFleet,
        setFleetName,
        setShipCount,
        setCarriedShipCount,
    } = useFleetEditor();

    const handleStartRenaming = () => {
        setRenaming(true);
    };

    const handleConfirmRenaming = (newName: string) => {
        setFleetName(newName);
    };

    const cancelRenaming = () => {
        setRenaming(false);
    };

    return (
        <>
            <Stack spacing={2}>
                <Paper>
                    <Box p={1}>
                        <Stack spacing={2} direction="row">
                            <div>
                                <FleetSelection fleetSetups={fleetSetups} fleetSetup={fleetSetup} onChange={switchFleet} />
                            </div>
                            <div>
                                <IconButton onClick={handleStartRenaming}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </Stack>
                    </Box>
                </Paper>
                <Paper>
                    <Box p={1}>
                        <pre>
                            <code>
                                {JSON.stringify(fleetSetup, null, 2)}
                            </code>
                        </pre>
                    </Box>
                </Paper>
            </Stack>
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
