import { useState, ChangeEventHandler } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { IShipListState } from './types/IShipListState';
import { formatShipListForSharing } from './utils/myListUtils';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { copyToClipboard } from '../../../utils/clipboardUtils';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';
import { t } from '../../../i18n';

export interface IProps {
    ships: IShipListState;
    onClose: () => void;
}

export const ShipsSharingDialog = (props: IProps) => {
    const { ships, onClose } = props;
    const [copied, setCopied] = useState<boolean>(false);
    const { userSettings } = useUserSettings();

    const [textForSharing, setTextForSharing] = useState<string>(() => formatShipListForSharing(ships.possessed, userSettings));

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
            title={t('button.share')}
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
                            {t('button.copyToClipboard')}
                        </Button>
                    )}
                </Stack>
            )}
            actions={(
                <Button variant="outlined" onClick={handleClose}>
                    {t('button.close')}
                </Button>
            )}
            onClose={handleClose}
        />
    );
};
