import { ReactNode, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IShipListState } from './types/IShipListState';
import { formatShipListForSharing } from './utils/myListUtils';

export interface IProps {
    ships: IShipListState;
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const ShipsSharingDialog = (props: IProps) => {
    const { ships, onClose, open, children } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [copied, setCopied] = useState<boolean>(false);

    const textForSharing = useMemo(() => formatShipListForSharing(ships.possessed), [ships]);

    const handleCopy = () => {
        if (textForSharing) {
            copyToClipboard(textForSharing).then(() => {
                setCopied(true);
            });
        }
    };

    const handleClose = () => {
        onClose();
        setCopied(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth="xs"
            onClose={handleClose}
            open={open}
        >
            <DialogTitle>{'共有'}</DialogTitle>
            <DialogContent>
                <Stack spacing={1}>
                    <TextField
                        variant="filled"
                        id="outlined-multiline-static"
                        multiline={true}
                        rows={10}
                        defaultValue={textForSharing}
                        fullWidth={true}
                    />
                    {!!navigator.clipboard && (
                        <Button
                            variant="outlined"
                            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                            onClick={handleCopy}
                            fullWidth={true}
                        >
                            {'クリップボードにコピー'}
                        </Button>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    {'閉じる'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        console.error(e);
    }
}
