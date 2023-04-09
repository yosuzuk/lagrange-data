import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { useMapContent } from './hooks/useMapContent';
import { MapContent } from './3d/MapContent';
import { WorldMap } from './3d/WorldMap';
import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
import { LoadingIndicator } from '../../loading/LoadingIndicator';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { t } from '../../../i18n';

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
                <ResponsiveDialog
                    maxWidth="md"
                    content={(
                        <>
                            {parseError && (
                                <Alert severity="error">
                                    <AlertTitle>{`Syntax error in line ${parseError.line}`}</AlertTitle>
                                    {parseError.message}
                                </Alert>
                            )}
                            <textarea value={input} onChange={e => setInput(e.target.value)} />
                        </>
                    )}
                    actions={(
                        <>
                            <Button variant="outlined" onClick={cancelEditMode}>
                                {t('button.cancel')}
                            </Button>
                            <Button variant="contained" onClick={applyInput}>
                                {t('button.confirm')}
                            </Button>
                        </>
                    )}
                />
            )}
        </>
    );
};

export default MapSelectedPage;
