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
import { MapDialAction } from './MapDialAction';
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
                <AlertTitle>{t('mapEdit.invalidMap')}</AlertTitle>
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
                <AlertTitle>{t('label.error')}</AlertTitle>
                {`${queryResult.error}`}
            </Alert>
        );
    }

    if (!mapContent && parseError) {
        return (
            <Alert severity="error">
                <AlertTitle>{t('mapEdit.syntaxErrorInLine', { value: parseError.line })}</AlertTitle>
                {parseError.message}
            </Alert>
        )
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
                    <WorldMap systemName={mapContent.name} size={mapContent.size}>
                        <MapContent mapContent={mapContent} />
                    </WorldMap>
                </ZoomLevelProvider>
            </CursorProvider>
            <MapDialAction onEdit={setEditMode} />
            {(mode === 'edit') && (
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
