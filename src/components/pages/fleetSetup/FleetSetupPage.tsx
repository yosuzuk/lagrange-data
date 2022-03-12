import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetSetupActionBar } from './FleetSetupActionBar';

export const FleetSetupPage = () => {
    const navigate = useNavigate();

    const handleClickEdit = () => {
        navigate('/fleetSetup/edit');
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
                onEdit={handleClickEdit}
                onShare={handleClickShare}
            />
            <Container>
                <Box p={1}>
                    {'TODO'}
                </Box>
            </Container>
        </>
    );
}

export default FleetSetupPage;
