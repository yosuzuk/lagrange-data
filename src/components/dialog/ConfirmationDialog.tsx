import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import { ResponsiveDialog } from './ResponsiveDialog';

export interface IProps {
    title: string;
    question: string;
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmationDialog = (props: IProps) => {
    const { title, question, cancelText = 'キャンセル', confirmText = 'ＯＫ', onCancel, onConfirm } = props;

    return (
        <ResponsiveDialog
            title={title}
            content={(
                <DialogContentText>
                    {question}
                </DialogContentText>
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button variant="contained" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </>
            )}
            onClose={onCancel}
        />
    );
};
