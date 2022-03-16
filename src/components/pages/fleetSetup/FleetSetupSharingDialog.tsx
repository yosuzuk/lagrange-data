import { useState, ChangeEventHandler } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { copyToClipboard } from '../../../utils/clipboardUtils';
import { IGroupedShips } from './types/IGroupedShips';
import { formatGroupedShipsForSharing } from './utils/shipGroupingUtils';
import { IFleetSetup } from './types/IFleetSetup';

export interface IProps {
    fleetSetup: IFleetSetup;
    groupedShips: IGroupedShips;
    onClose: () => void;
}

export const FleetSetupSharingDialog = (props: IProps) => {
    const { fleetSetup, groupedShips, onClose } = props;
    const [copied, setCopied] = useState<boolean>(false);

    const [textForSharing, setTextForSharing] = useState<string>(() => formatGroupedShipsForSharing(fleetSetup, groupedShips));

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
