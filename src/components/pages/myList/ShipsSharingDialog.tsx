import { useState, ChangeEventHandler } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { IShipListState } from './types/IShipListState';
import { formatShipListForSharing } from './utils/myListUtils';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';

export interface IProps {
    ships: IShipListState;
    onClose: () => void;
}

export const ShipsSharingDialog = (props: IProps) => {
    const { ships, onClose } = props;
    const [copied, setCopied] = useState<boolean>(false);

    const [textForSharing, setTextForSharing] = useState<string>(() => formatShipListForSharing(ships.possessed));

    const handleCopy = () => {
        if (textForSharing) {
            copyToClipboard(textForSharing).then(() => {
                setCopied(true);
            });
        }
    };

    const handleChance: ChangeEventHandler<HTMLTextAreaElement> = event => {
        setTextForSharing(event.target.value);
    }

    const handleClose = () => {
        onClose();
        setCopied(false);
    };

    return (
        <ResponsiveDialog
            title={'共有'}
            content={(
                <Stack spacing={1}>
                    <TextField
                        variant="filled"
                        id="outlined-multiline-static"
                        multiline={true}
                        onChange={handleChance}
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
            )}
            actions={(
                <Button variant="outlined" onClick={handleClose}>
                    {'閉じる'}
                </Button>
            )}
            onClose={handleClose}
        />
    );
};

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        console.error(e);
    }
}
