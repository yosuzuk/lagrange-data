import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { t } from '../../../i18n';

interface IProps {
    title: string;
    text: string;
}

export const HelpPopper = (props: IProps) => {
    const { title, text } = props;
    const [opened, setOpened] = useState<boolean>(false);

    const handleOpen = () => {
        setOpened(true);
    };

    const handleClose = () => {
        setOpened(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <HelpOutlineIcon fontSize="small" color="secondary" />
            </IconButton>
            <Dialog
                open={opened}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">{t('button.close')}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
