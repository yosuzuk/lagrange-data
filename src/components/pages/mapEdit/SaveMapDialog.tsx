import { useCallback, useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { t } from '../../../i18n';
import { useColorMode } from '../../../theme/context/ThemeProvider';

interface IProps {
    onCancel: () => void;
    onSave: (editKey: string) => void;
}

export const SaveMapDialog = (props: IProps) => {
    const { onCancel, onSave } = props;
    const [editKey, setEditKey] = useState<string>('');
    const colorMode = useColorMode();

    const handleSave = useCallback(() => {
        onSave(editKey);
    }, [onSave, editKey]);

    const handleChangeEditKey = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEditKey(e.target.value);
    }, []);

    return (
        <ResponsiveDialog
            title={t('mapEdit.saveMap')}
            maxWidth="xs"
            disableRestoreFocus={true}
            backgroundColor={colorMode.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'white'}
            content={(
                <TextField
                    variant="outlined"
                    label={t('mapEdit.editKeyInstruction')}
                    placeholder={t('mapEdit.editKeyPlaceholder')}
                    value={editKey}
                    onChange={handleChangeEditKey}
                    fullWidth={true}
                />
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {t('button.cancel')}
                    </Button>
                    <Button variant="contained" onClick={handleSave} disabled={!editKey}>
                        {t('button.save')}
                    </Button>
                </>
            )}
        />
    );
};
