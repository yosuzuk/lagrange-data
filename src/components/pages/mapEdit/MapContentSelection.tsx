import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IMapContent } from './types/IMapContent';
import { mapContentToText } from './utils/mapContentUtils';
import { SecondaryButton } from './Button';
import { t } from '../../../i18n';
import { useMapInteraction } from './context/MapInteractionContext';

interface IProps {
    mapContent: IMapContent;
}

export const MapContentSelection = (props: IProps) => {
    const { mapContent } = props;
    const { markTarget, editContent, removeContent } = useMapInteraction();

    const clearTarget = () => {
        markTarget(null);
    }

    const text = mapContentToText(mapContent);
    if (!text) {
        return null;
    }

    return (
        <Stack
            sx={{
                marginBottom: '4px',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                    minWidth: '281px',
                    minHeight: '30px',
                    backgroundColor: '#121212',
                    padding: '2px 4px',
                    border: '1px solid grey',
                    borderBottom: 'none',
                }}
            >
                <Box component="div" sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" component="pre" textAlign="center">
                        {text}
                    </Typography>
                </Box>
                <Typography
                    variant="body1"
                    onClick={clearTarget}
                    sx={{
                        cursor: 'pointer',
                        minWidth: '18px',
                        color: 'lightgray',
                        textAlign: 'center'
                    }}
                >
                    {'×'}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="end"
                sx={{
                    minWidth: '281px',
                    minHeight: '30px',
                    backgroundColor: '#121212',
                    padding: '2px 4px',
                    border: '1px solid grey',
                }}
            >
                <SecondaryButton onClick={() => editContent(mapContent)}>{t('button.edit')}</SecondaryButton>
                <SecondaryButton onClick={() => removeContent(mapContent)}>{t('button.delete')}</SecondaryButton>
            </Stack>
        </Stack>
    );
};
