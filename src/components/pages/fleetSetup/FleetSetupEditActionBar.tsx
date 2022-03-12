import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ActionBar } from '../../actionBar/ActionBar';

interface IProps {
    onCancel: () => void;
    onSave: () => void;
    onReset: () => void;
    saveDisabled: boolean;
}

export const FleetSetupEditActionBar = (props: IProps) => {
    const {
        onCancel,
        onSave,
        onReset,
        saveDisabled,
    } = props;

    return (
        <ActionBar
            left={(fullWidth: boolean) => (
                <>
                    <Button
                        key="save"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                        disabled={saveDisabled}
                        fullWidth={fullWidth}
                    >
                        {'保存'}
                    </Button>
                </>
            )}
            right={(fullWidth: boolean) => (
                <>
                    <Button
                        key="reset"
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        onClick={onReset}
                        fullWidth={fullWidth}
                    >
                        {'初期化'}
                    </Button>
                    <Button
                        key="cancel"
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                        fullWidth={fullWidth}
                    >
                        {'キャンセル'}
                    </Button>
                </>
            )}
        />
    );
}
