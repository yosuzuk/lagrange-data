import { useState, ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { isUrl } from '../../../utils/urlUtils';
import { t } from '../../../i18n';
import { routes } from '../../../utils/routes';
import { getExampleMaps } from './examples/examplesMaps';

export const LoadMapFromUrl = () => {
    const [mapUrl, setMapUrl] = useState<string>(() => {
        return getExampleMaps().fullMapExample.url;
    });
    const [validUrl, setValidUrl] = useState<boolean | null>(null);
    const [showValidation, setShowValidation] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleConfirmMapUrl = () => {
        if (!isUrl(mapUrl)) {
            setValidUrl(false);
            setShowValidation(true);
            return;
        }
        navigate(routes.mapSelected.createPath({
            d: window.btoa(mapUrl),
        }));
    };

    const handleChangeMapUrl: ChangeEventHandler<HTMLInputElement> = e => {
        setShowValidation(false);
        setMapUrl(e.target.value);
    };

    return (
        <Stack spacing={1}>
            <Typography variant="body1">
                {'URL'}
            </Typography>
            <Stack direction="row" spacing={1}>
                <Box component="div" sx={{ flexGrow: 1 }}>
                    <TextField
                        id="url-input"
                        variant="outlined"
                        value={mapUrl}
                        onChange={handleChangeMapUrl}
                        error={showValidation && !validUrl}
                        helperText={(showValidation && !validUrl) ? t('mapEdit.invalidUrl') : undefined}
                        fullWidth={true}
                        autoComplete="off"
                        size="small"
                    />
                </Box>
                <div>
                    <Button
                        variant="outlined"
                        onClick={handleConfirmMapUrl}
                        disabled={mapUrl.length === 0}
                    >
                        {t('button.confirm')}
                    </Button>
                </div>
            </Stack>
        </Stack>
    );
};
