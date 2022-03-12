import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetSetupActionBar } from './FleetSetupActionBar';
import { useFleetSelection } from './hooks/useFleetSelection';

export const FleetSetupPage = () => {
    const navigate = useNavigate();

    const {
        fleetSetups,
        fleetSetup,
        switchFleet,
    } = useFleetSelection();

    const handleClickEdit = () => {
        navigate('/fleetSetup/edit/' + fleetSetup.key);
    };

    const handleClickShare = () => {
        // TODO implement
    };

    // const handleCloseShare = () => {
        // TODO implement
    // };

    return (
        <>
            <NavigationBar currentRoute="/fleetSetup" />
            <FleetSetupActionBar
                fleetSetups={fleetSetups}
                fleetSetup={fleetSetup}
                onChangeFleet={switchFleet}
                onEdit={handleClickEdit}
                onShare={handleClickShare}
            />
            <Container>
                <Box p={1}>
                    <Stack spacing={2}>
                        <Paper>
                            <Box p={1}>
                                <Typography variant="body1">
                                    {fleetSetup.name}
                                </Typography>
                            </Box>
                        </Paper>
                        <Paper>
                            <Box p={1}>
                                <Typography variant="body1">
                                    {'TODO'}
                                </Typography>
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default FleetSetupPage;
