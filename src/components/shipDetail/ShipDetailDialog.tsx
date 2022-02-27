import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getShipDefinitionById } from '../../utils/shipDefinitionUtils';
import { ShipDetail } from './ShipDetail';

interface IProps {
    shipId: string;
    onClose: () => void;
}

export const ShipDetailDialog = (props: IProps) => {
    const { shipId, onClose } = props;
    const [localShipId, setLocalShipId] = useState<string>(shipId);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const shipDefinition = getShipDefinitionById(localShipId);

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth="sm"
            onClose={onClose}
            open={true}
        >
            <DialogTitle>{shipDefinition.name}</DialogTitle>
            <DialogContent>
                <ShipDetail shipId={localShipId} onClickShip={setLocalShipId} hideName={true} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    {'閉じる'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
