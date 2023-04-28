import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { IOverlayText } from './types/IMapContent';

interface IProps {
    overlayText: IOverlayText[];
}

export const MapOverlay = (props: IProps) => {
    const { overlayText } = props;

    return (
        <Box
            component="div"
            sx={{
                position: 'absolute',
                left: '8px',
                top: '8px',
                border: '1px solid grey',
                backgroundColor: 'rgba(0,0,0,0.75)',
                padding: '4px 8px',
                maxWidth: '65vw',
                maxHeight: '75vh',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <Stack spacing={1}>
                {overlayText.map((line: IOverlayText, index: number) => (
                    <Typography
                        key={`overlay_${index}`}
                        variant={overlayTextTypeToTypographyVariant(line.type)}
                        sx={{ color: 'white' }}
                    >{line.text}</Typography>
                ))}
            </Stack>
        </Box>
    );
};

function overlayTextTypeToTypographyVariant(type: IOverlayText['type']): TypographyProps['variant'] {
    switch (type) {
        case 'h1':
            return 'h1';
        case 'h2':
            return 'h2';
        case 'h3':
            return 'h3';
        default:
            return 'body2';
    }
}
