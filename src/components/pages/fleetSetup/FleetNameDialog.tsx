import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';

export interface IProps {
    fleetName: string;
    onCancel: () => void;
    onConfirm: (fleetName: string) => void;
}

export const FleetNameDialog = (props: IProps) => {
    const { fleetName, onCancel, onConfirm } = props;

    const [newName, setNewName] = useState<string>(fleetName);
    const [error, setError] = useState<string | null>(null);

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const handleConfirm = () => {
        if (newName === fleetName) {
            onCancel();
            return;
        }
        if (newName.length === 0) {
            setError('艦隊名を入力してください');
            return;
        }
        if (newName.length > 20) {
            setError('艦隊名が長すぎます');
            return;
        }
        onConfirm(newName);
    };

    return (
        <ResponsiveDialog
            title={'艦隊名'}
            content={(
                <TextField
                    variant="outlined"
                    value={newName}
                    onChange={handleChangeName}
                    error={!!error}
                    helperText={error}
                />
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {'キャンセル'}
                    </Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        {'変更'}
                    </Button>
                </>
            )}
            onClose={onCancel}
        />
    );
};
