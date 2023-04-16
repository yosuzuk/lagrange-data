import { useCallback, Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import IconButton from '@mui/material/IconButton';
import { MapInteractionMode } from './types/Mode';

interface IProps {
    mode: MapInteractionMode;
    setMode: Dispatch<SetStateAction<MapInteractionMode>>;
    onExit: () => void;
}

export const MapTopRightBar = (props: IProps) => {
    const { mode, onExit, setMode } = props;

    const handleToggleViewMode = useCallback(() => {
        setMode(mode => {
            switch (mode) {
                case 'view':
                    return 'interactive';
                case 'interactive':
                    return 'view';
                default:
                    return mode;
            }
        });
    }, [setMode]);

    return (
        <Box
            component="div"
            sx={{
                position: 'absolute',
                right: '8px',
                top: '8px',
            }}
        >
            <Stack direction="row" spacing={1}>
                <Box
                    component="div"
                    sx={{
                        backgroundColor: mode === 'interactive' ? '#121212' : 'transparent',
                        border: mode === 'interactive' ? '1px solid grey' : '1px solid transparent',
                    }}
                >
                    <IconButton size="small" aria-label="viewMode" onClick={handleToggleViewMode} sx={{ height: '26px', scale: '0.75' }}>
                        <VisibilityIcon sx={{
                            color: 'white',
                            opacity: mode === 'interactive' ? 1 : 0.25,
                        }} />
                    </IconButton>
                </Box>
                <Box
                    component="div"
                    sx={{
                        visibility: mode === 'interactive' ? 'visible' : 'hidden',
                        backgroundColor: '#121212',
                        border: '1px solid grey',
                    }}
                >
                    <IconButton size="small" aria-label="viewMode" onClick={onExit} sx={{ height: '26px', scale: '0.75' }}>
                        <KeyboardReturnIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );
};
