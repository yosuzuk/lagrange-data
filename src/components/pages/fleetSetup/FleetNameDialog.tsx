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

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    }

    const handleConfirm = () => {
        if (newName === fleetName) {
            onCancel();
            return;
        }
        onConfirm(newName);
    };

    return (
        <ResponsiveDialog
            title={'艦隊名'}
            content={(
                <TextField variant="outlined" value={newName} onChange={handleChangeName} />
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {'キャンセル'}
                    </Button>
                    <Button variant="outlined" onClick={handleConfirm}>
                        {'変更'}
                    </Button>
                </>
            )}
            onClose={onCancel}
        />
    );
};
