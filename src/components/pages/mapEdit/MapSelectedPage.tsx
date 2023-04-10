import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useMapData } from './hooks/useMapData';
import { StarSystem } from './3d/StarSystem';
import { LoadingIndicator } from '../../loading/LoadingIndicator';
import { MapEditDialog } from './MapEditDialog';
import { MapDialAction } from './MapDialAction';
import { t } from '../../../i18n';
import { MapProviders } from './MapProviders';
import { routes } from '../../../utils/routes';

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
        validateInput,
    } = useMapData();

    const navigate = useNavigate();
    const handleClickExit = useCallback(() => {
        navigate(routes.map.path);
    }, [navigate]);

    if (!mapUrl) {
        return (
            <Alert severity="error">
                <AlertTitle>{t('mapEdit.invalidMap')}</AlertTitle>
            </Alert>
        );
    }

    if (queryResult.isLoading) {
        return (
            <LoadingIndicator />
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

    return (
        <>
            {mapData && (
                <MapProviders mapData={mapData}>
                    <StarSystem mapData={mapData} />
                </MapProviders>
            )}
            <MapDialAction onEdit={setEditMode} onExit={handleClickExit} />
            {(mode === 'edit') && (
                <MapEditDialog
                    input={input}
                    setInput={setInput}
                    parseError={parseError}
                    onCancel={!!mapData ? cancelEditMode : handleClickExit}
                    onApply={applyInput}
                    onValidate={validateInput}
                />
            )}
        </>
    );
};

export default MapSelectedPage;
