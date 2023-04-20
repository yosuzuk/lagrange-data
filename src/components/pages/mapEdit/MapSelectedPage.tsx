import { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useMapData } from './hooks/useMapData';
import { StarSystem } from './3d/StarSystem';
import { LoadingIndicator } from '../../loading/LoadingIndicator';
import { MapEditDialog } from './MapEditDialog';
import { t } from '../../../i18n';
import { MapProviders as _MapProviders } from './MapProviders';
import { routes } from '../../../utils/routes';
import { MapNavigatorBar } from './MapNavigatorBar';
import { MapTopRightBar } from './MapTopRightBar';
import { EditMapButton } from './EditMapButton';
import { SaveMapButton } from './SaveMapButton';
import Box from '@mui/material/Box';

const MapProviders = memo(_MapProviders);

const MapSelectedPage = () => {
    const {
        mode,
        mapUrl,
        input,
        mapData,
        parseError,
        targetToMark,
        loading,
        saving,
        isError,
        error,
        changeState,
        allowSave,
        setMode,
        cancelEditMode,
        setInput,
        applyInput,
        validateInput,
        saveInput,
        removeContent,
        markTarget,
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

    if (loading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <>
            {isError && (
                <Box component="div" sx={{ position: 'absolute', top: '8px', left: '8px' }}>
                    <Alert severity="error">
                        <AlertTitle>{t('label.error')}</AlertTitle>
                        {`${error}`}
                    </Alert>
                </Box>
            )}
            {!isError && mapData && (
                <MapProviders mapData={mapData} targetToMark={targetToMark}>
                    <StarSystem mapData={mapData} />
                </MapProviders>
            )}
            <MapTopRightBar mode={mode} onExit={handleClickExit} setMode={setMode} />
            {mode === 'edit' && (
                <MapEditDialog
                    input={input}
                    setInput={setInput}
                    parseError={parseError}
                    onCancel={!!mapData ? cancelEditMode : handleClickExit}
                    onApply={applyInput}
                    onValidate={validateInput}
                />
            )}
            {mode === 'interactive' && mapData && (
                <>
                    <MapNavigatorBar mapData={mapData} onRemoveContent={removeContent} onMarkTarget={markTarget} />
                    <SaveMapButton saving={saving} save={saveInput} changeState={changeState} allowSave={allowSave} />
                    <EditMapButton setMode={setMode} />
                </>
            )}
        </>
    );
};

export default MapSelectedPage;
