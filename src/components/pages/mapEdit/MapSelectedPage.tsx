import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useMapContent } from './hooks/useMapContent';
import { MapContent } from './3d/MapContent';
import { WorldMap } from './3d/WorldMap';
import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
import { LoadingIndicator } from '../../loading/LoadingIndicator';
import { MapEditDialog } from './MapEditDialog';

const MapSelectedPage = () => {
    const {
        mode,
        mapUrl,
        queryResult,
        input,
        mapContent,
        parseError,
        setEditMode,
        cancelEditMode,
        setInput,
        applyInput,
    } = useMapContent();

    if (!mapUrl) {
        return (
            <Alert severity="error">
                <AlertTitle>{'Invalid map'}</AlertTitle>
            </Alert>
        );
    }

    if (queryResult.isLoading) {
        return (
            <Typography variant="body2">{'Loading...'}</Typography>
        );
    }

    if (queryResult.isError) {
        return (
            <Alert severity="error">
                <AlertTitle>{'Error'}</AlertTitle>
                {`${queryResult.error}`}
            </Alert>
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
                <button onClick={setEditMode}>Edit</button>
            </Box>
            {mode === 'edit' && (
                <MapEditDialog
                    input={input}
                    setInput={setInput}
                    parseError={parseError}
                    onCancel={cancelEditMode}
                    onApply={applyInput}
                />
            )}
        </>
    );
};

export default MapSelectedPage;
