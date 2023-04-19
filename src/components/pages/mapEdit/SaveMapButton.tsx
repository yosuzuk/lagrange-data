import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { MutationState } from './types/MutationState';
import { SaveMapDialog } from './SaveMapDialog';

interface IProps {
    saving: boolean;
    changeState: MutationState;
    allowSave: boolean;
    save: (editKey: string) => void;
}

export const SaveMapButton = (props: IProps) => {
    const { saving, changeState, allowSave, save } = props;
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        if (changeState !== 'unsaved') {
            return;
        }
        setShowDialog(true);
    }, [changeState, save]);

    const handleConfirmSave = useCallback((editKey: string) => {
        setShowDialog(false);
        save(editKey);
    }, [save]);

    const cancelConfirm = useCallback(() => {
        setShowDialog(false);
    }, []);

    if (changeState === 'noChange' || changeState === 'noData') {
        return null;
    }

    return (
        <>
            <Box component="div" sx={{ position: 'absolute', right: '8px', bottom: '80px', overflow: 'hidden' }}>
                <Box  component="div" sx={{ position: 'relative' }}>
                    <Fab
                        color="primary"
                        aria-label="save"
                        onClick={handleClick}
                        disabled={!allowSave || saving || changeState === 'saved'}
                        sx={{
                            backgroundColor: '#121212',
                            border: '1px solid grey',
                            opacity: allowSave ? 1 : 0.25,
                        }}
                    >
                        {changeState === 'saved' ? (
                            <DoneIcon sx={{ color: 'white' }} />
                        ) : (
                            <SaveIcon sx={{ color: 'white' }} />
                        )}
                    </Fab>
                    {saving && (
                        <CircularProgress
                            size={56}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
            </Box>
            {showDialog && (
                <SaveMapDialog onSave={handleConfirmSave} onCancel={cancelConfirm} />
            )}
        </>
    );
};
