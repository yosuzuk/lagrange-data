import Box from '@mui/material/Box';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetEditor } from './FleetEditor';

export const FleetEditorPage = () => {
    return (
        <>
            <NavigationBar currentRoute="/fleetEditor" />
            <Container>
                <Box p={1}>
                    <FleetEditor />
                </Box>
            </Container>
        </>
    );
}

export default FleetEditorPage;
