import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';
import { getShipDefinitionById, getShipName } from '../../utils/shipDefinitionUtils';
import { ShipDetail } from './ShipDetail';
import { copyToClipboard } from '../../utils/clipboardUtils';
import { t } from '../../i18n';

interface IProps {
    shipId: string;
    onClose: () => void;
}

export const ShipDetailDialog = (props: IProps) => {
    const { shipId, onClose } = props;
    const [localShipId, setLocalShipId] = useState<string>(shipId);
    const [copied, setCopied] = useState<boolean>(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const shipDefinition = getShipDefinitionById(localShipId);

    const handleCopyLink = () => {
        const url = new URL(window.location.href);
        const deeplink = `${url.origin}${url.pathname}#/shipData/${shipId}`;
        copyToClipboard(deeplink).then(() => {
            setCopied(true);
        });
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth="sm"
            onClose={onClose}
            open={true}
        >
            <DialogTitle>{getShipName(shipDefinition)}</DialogTitle>
            <DialogContent>
                <ShipDetail shipId={localShipId} onClickShip={setLocalShipId} hideName={true} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCopyLink} startIcon={copied ? <CheckIcon /> : <LinkIcon />}>
                    {t('button.copyToClipboard')}
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    {t('button.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
