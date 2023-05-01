import { Dispatch, SetStateAction } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IMapContent } from './types/IMapContent';
import { mapContentToText } from './utils/mapContentUtils';

interface IProps {
    mapContent: IMapContent;
    onMarkTarget: Dispatch<SetStateAction<IMapContent | null>>;
}

export const MapContentSelection = (props: IProps) => {
    const { mapContent, onMarkTarget } = props;

    const clearTarget = () => {
        onMarkTarget(null);
    }

    const text = mapContentToText(mapContent);
    if (!text) {
        return null;
    }

    return (
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
                marginBottom: '4px',
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
    );
};
