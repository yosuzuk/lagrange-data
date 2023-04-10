import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useMapData } from './hooks/useMapData';
import { StarSystem } from './3d/StarSystem';
import { LoadingIndicator } from '../../loading/LoadingIndicator';
import { MapEditDialog } from './MapEditDialog';
import { MapDialAction } from './MapDialAction';
import { t } from '../../../i18n';
import { MapProviders } from './MapProviders';

const MapSelectedPage = () => {
    const {
        mode,
        mapUrl,
        queryResult,
        input,
        mapData,
        parseError,
        setEditMode,
        cancelEditMode,
        setInput,
        applyInput,
    } = useMapData();

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

    if (!mapData && parseError) {
        return (
            <Alert severity="error">
                <AlertTitle>{t('mapEdit.syntaxErrorInLine', { value: parseError.line })}</AlertTitle>
                {parseError.message}
            </Alert>
        )
    }

    if (!mapData) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <>
            <MapProviders mapData={mapData}>
                <StarSystem mapData={mapData} />
            </MapProviders>
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
