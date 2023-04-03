import { ChangeEventHandler, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ResponsiveDialog } from './ResponsiveDialog';
import { t } from '../../i18n';
import { supportsShowOpenFilePicker } from '../../utils/file';
import { ConfirmationDialog } from './ConfirmationDialog';

export type TConfirmImportCallback<T> = (data: T) => void;
export type TCancelImportCallback = () => void;

interface IProps<T> {
    confirmDialogTitle: string;
    confirmWarning?: string;
    createPreview: (data: T) => string;
    parseInput: (input: string) => T | null;
    canRestore?: boolean;
    onImport: (data: T) => void;
    onClose: () => void;
    onSelectFile: (confirm: TConfirmImportCallback<T>, cancel: TCancelImportCallback) => void;
    onRestoreFromBackup?: (confirm: TConfirmImportCallback<T>, cancel: TCancelImportCallback) => void;
}

export const ImportDataDialog = <T,>(props: IProps<T>) => {
    const { confirmDialogTitle, confirmWarning, createPreview, parseInput, canRestore, onImport, onClose, onSelectFile, onRestoreFromBackup } = props;
    const [importDataToConfirm, setImportDataToConfirm] = useState<T | null>(null);
    const [valueToParse, setValueToParse] = useState<string>('');
    const [isInvalidValue, setIsInvalidValue] = useState<boolean>(false);

    const handleSelectFile = () => {
        onSelectFile((data: T) => {
            setImportDataToConfirm(data);
        }, () => {
            onClose();
        });
    };

    const handleRestoreFromBackup = () => {
        onRestoreFromBackup?.((data: T) => {
            setImportDataToConfirm(data);
        }, () => {
            onClose();
        });
    };

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = e => {
        setIsInvalidValue(false);
        setValueToParse(e.target.value);
    };

    const handleParse = () => {
        setIsInvalidValue(false);
        let parsed: T | null;
        try {
            parsed = parseInput(valueToParse);
        } catch (e) {
            console.error(e);
            setIsInvalidValue(true);
            return;
        }

        if (parsed === null) {
            setIsInvalidValue(true);
            return;
        }

        setImportDataToConfirm(parsed);
    }

    const handleConfirm = () => {
        if (importDataToConfirm) {
            onImport(importDataToConfirm);
        }
        onClose();
    };

    if (importDataToConfirm) {
        return (
            <ConfirmationDialog
                title={confirmDialogTitle}
                question={(
                    <Stack>
                        {confirmWarning && (
                            <Alert severity="warning">{confirmWarning}</Alert>
                        )}
                        <Box component="div" p={1}>
                            <Typography variant="body2" component="div">
                                <pre>
                                    {createPreview(importDataToConfirm)}
                                </pre>
                            </Typography>
                        </Box>
                    </Stack>
                )}
                onConfirm={handleConfirm}
                onCancel={() => setImportDataToConfirm(null)}
            />
        );
    }

    return (
        <ResponsiveDialog
            title={t('label.dataImport')}
            content={
                <Stack spacing={4}>
                    {confirmWarning && (
                        <Alert severity="warning">{confirmWarning}</Alert>
                    )}
                    <Stack spacing={1}>
                        <Typography variant="body1">
                            {t('label.importFromFile')}
                        </Typography>
                        <Button variant="outlined" onClick={handleSelectFile} disabled={!supportsShowOpenFilePicker()}>
                            {t('button.chooseFile')}
                        </Button>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="body1">
                            {t('label.directInput')}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Box component="div" sx={{ flexGrow: 1 }}>
                                <TextField
                                    id="json-input"
                                    placeholder={t('label.pasteHere')}
                                    variant="outlined"
                                    value={valueToParse}
                                    onChange={handleChangeInput}
                                    error={isInvalidValue}
                                    helperText={isInvalidValue ? t('validation.invalidValue') : undefined}
                                    fullWidth={true}
                                    autoComplete="off"
                                    size="small"
                                />
                            </Box>
                            <div>
                                <Button
                                    variant="outlined"
                                    onClick={handleParse}
                                    disabled={valueToParse.length === 0}
                                >
                                    {t('button.parseInput')}
                                </Button>
                            </div>
                        </Stack>
                    </Stack>
                    {canRestore && (
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {t('label.restoreFromBackup')}
                            </Typography>
                            <Button variant="outlined" onClick={handleRestoreFromBackup}>
                                {t('button.restoreFromStorage')}
                            </Button>
                        </Stack>
                    )}
                </Stack>
            }
            onClose={onClose}
            actions={(
                <>
                    <Button variant="outlined" onClick={onClose}>
                        {t('button.cancel')}
                    </Button>
                </>
            )}
        />
    );
};
