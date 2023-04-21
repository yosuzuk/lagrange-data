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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
            <Box component="div" pb={3}>
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
                            {t('mapEdit.loadAndOpenMap')}
                        </Button>
                    </div>
                </Stack>
            </Box>
            <Typography variant="body1">
                {t('mapEdit.mapUrlSpecColon')}
            </Typography>
            <Box
                component="div"
                p={2}
                sx={{
                    border: '1px solid rgba(128,128,128,0.5)',
                    borderRadius: '8px',
                }}
            >
                <Stack direction="row" spacing={1}>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('mapEdit.loadMapSpec')}
                        </Typography>
                        <List
                            dense={true}
                            sx={{
                                listStyleType: 'disc',
                                pt: 0,
                                pl: 3,
                                '& .MuiListItem-root': {
                                    display: 'list-item',
                                },
                            }}
                        >
                            <ListItem disableGutters={true}>
                                <Typography variant="body2" color="text.secondary">
                                    {'HTTP Method: OPTION, GET'}
                                </Typography>
                            </ListItem>
                            <ListItem disableGutters={true}>
                                <Typography variant="body2" color="text.secondary">
                                    {'Content-Type: text/plain'}
                                </Typography>
                            </ListItem>
                            <ListItem disableGutters={true} >
                                <Typography variant="body2" color="text.secondary">
                                    {t('mapEdit.corsHeader')}
                                </Typography>
                            </ListItem>
                        </List>
                    </Stack>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {t('mapEdit.saveMapSpec')}
                        </Typography>
                        <List
                            dense={true}
                            sx={{
                                listStyleType: 'disc',
                                pt: 0,
                                pl: 3,
                                '& .MuiListItem-root': {
                                    display: 'list-item',
                                },
                            }}
                        >
                            <ListItem disableGutters={true}>
                                <Typography variant="body2" color="text.secondary">
                                    {'HTTP Method: OPTION, PUT'}
                                </Typography>
                            </ListItem>
                            <ListItem disableGutters={true}>
                                <Typography variant="body2" color="text.secondary">
                                    {'Content-Type: text/plain'}
                                </Typography>
                            </ListItem>
                            <ListItem disableGutters={true} >
                                <Typography variant="body2" color="text.secondary">
                                    {t('mapEdit.corsHeader')}
                                </Typography>
                            </ListItem>
                            <ListItem disableGutters={true} >
                                <Typography variant="body2" color="text.secondary">
                                    {t('mapEdit.editKeySpec')}
                                </Typography>
                            </ListItem>
                        </List>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};
