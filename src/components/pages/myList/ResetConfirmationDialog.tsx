import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export interface IProps {
    onCancel: () => void;
    onConfirm: () => void;
}

export const ResetConfirmationDialog = (props: IProps) => {
    const { onCancel, onConfirm } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth="xs"
            onClose={onCancel}
            open={true}
        >
            <DialogTitle>{'初期化'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {'マイリスト設定を初期状態に戻しますか？'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onCancel}>
                    {'キャンセル'}
                </Button>
                <Button variant="outlined" onClick={onConfirm}>
                    {'初期化'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
