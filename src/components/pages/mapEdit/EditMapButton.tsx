import { useCallback, Dispatch, SetStateAction } from 'react';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { MapInteractionMode } from './types/Mode';

interface IProps {
    setMode: Dispatch<SetStateAction<MapInteractionMode>>
}

export const EditMapButton = (props: IProps) => {
    const { setMode } = props;

    const handleSetEditMode = useCallback(() => {
        setMode('edit');
    }, [setMode]);

    return (
        <Fab
            color="primary"
            aria-label="edit"
            onClick={handleSetEditMode}
            sx={{
                position: 'absolute',
                right: '8px',
                bottom: '8px',
                backgroundColor: 'rgba(255,255,255,0.2)',
            }}
        >
            <EditIcon />
        </Fab>
    );
};
