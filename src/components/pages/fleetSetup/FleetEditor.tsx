import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useFleetEditor } from './hooks/useFleetEditor';
import { FleetNameDialog } from './FleetNameDialog';

interface IProps {
    fleetKey?: string;
}

export const FleetEditor = (props: IProps) => {
    const { fleetKey } = props;
    const [renaming, setRenaming] = useState<boolean>(false);

    const {
        fleetSetup,
        setFleetName,
        setShipCount,
        setCarriedShipCount,
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

    return (
        <>
            <Stack spacing={2}>
                <Paper>
                    <Box p={1}>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <div>
                                <Typography variant="body1">
                                    {fleetSetup.name}
                                </Typography>
                            </div>
                            <div>
                                <IconButton onClick={handleStartRenaming}>
                                    <EditIcon fontSize="small" />
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
