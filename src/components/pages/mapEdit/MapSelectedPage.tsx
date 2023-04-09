import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { routes } from '../../../utils/routes';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { MapSelectedActionBar } from './MapSelectedActionBar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { PageFooter } from '../../pageStructure/PageFooter';
import { useMapContent } from './hooks/useMapContent';
import { MapContent } from './3d/MapContent';
import { WorldMap } from './3d/WorldMap';
import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
import { LoadingIndicator } from '../../loading/LoadingIndicator';

const MapSelectedPage = () => {
    const {
        mode,
        mapUrl,
        queryResult,
        input,
        mapContent,
        parseError,
        setEditMode,
        setInput,
        applyInput,
    } = useMapContent();

    if (mode === 'edit') {
        return (
            <>
                <NavigationBar currentRoute={routes.mapSelected.path} />
                <MapSelectedActionBar onApply={applyInput} canApply={queryResult.isSuccess} />
                <PageContent>
                    <Box component="div" p={1}>
                        {parseError && (
                            <Alert severity="error">
                                <AlertTitle>{`Syntax error in line ${parseError.line}`}</AlertTitle>
                                {parseError.message}
                            </Alert>
                        )}
                        {(!mapUrl) && (
                            <Alert severity="error">
                                <AlertTitle>{'Invalid map'}</AlertTitle>
                            </Alert>
                        )}
                        {queryResult.isLoading && (
                            <Typography variant="body2">{'Loading...'}</Typography>
                        )}
                        {queryResult.isError && (
                            <Alert severity="error">
                                <AlertTitle>{'Error'}</AlertTitle>
                                {`${queryResult.error}`}
                            </Alert>
                        )}
                        {queryResult.isSuccess && (
                            <Paper>
                                <Stack p={1} spacing={2}>
                                    <textarea value={input} onChange={e => setInput(e.target.value)} />
                                </Stack>
                            </Paper>
                        )}
                    </Box>
                </PageContent>
                <PageFooter />
            </>
        );
    }

    if (!mapContent) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <>
            <CursorProvider>
                <ZoomLevelProvider>
                    <WorldMap systemName="My Star System" size={9000}>
                        <MapContent mapContent={mapContent} />
                    </WorldMap>
                </ZoomLevelProvider>
            </CursorProvider>
            <Box component="div" sx={{ position: 'absolute', right: '0' }}>
                <button onClick={setEditMode}>Back</button>
            </Box>
        </>
    );
};

export default MapSelectedPage;
