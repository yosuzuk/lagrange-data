import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetSetupActionBar } from './FleetSetupActionBar';
import { useFleetSelection } from './hooks/useFleetSelection';
import { FleetProperties } from './FleetProperties';

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
                        <FleetProperties fleetSetup={fleetSetup} />
                    </Stack>
                </Box>
            </Container>
        </>
    );
}

export default FleetSetupPage;
