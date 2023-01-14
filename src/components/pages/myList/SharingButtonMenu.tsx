import { useState, useCallback, useMemo } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonProps } from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { t } from '../../../i18n';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';
import { downloadUserSettings, openUserSettingsFromFile, saveUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';
import { formatShipListForSharing } from './utils/myListUtils';
import { extractPossesssedShips } from '../../filter/filterUtils';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { supportsShowOpenFilePicker } from '../../../utils/file';

interface IProps {
    onCopyAsText: () => void;
    buttonProps?: ButtonProps;
}

export const SharingButtonMenu = (props: IProps) => {
    const { onCopyAsText, buttonProps } = props;
    const [importDataToConfirm, setImportDataToConfirm] = useState<IUserSettings | null>(null);

    const importPreview = useMemo<string | null>(() => {
        if (!importDataToConfirm) {
            return null;
        }
        const ships = extractPossesssedShips(shipDefinitions, importDataToConfirm.ships);
        return formatShipListForSharing(ships, importDataToConfirm);
    }, [importDataToConfirm]);

    const handleClick = useCallback((value: string) => {
        switch (value) {
            case 'copyAsText': {
                onCopyAsText();
                break;
            }
            case 'import': {
                (async () => {
                    const userSettings = await openUserSettingsFromFile();
                    if (userSettings) {
                        setImportDataToConfirm(userSettings);
                    }
                })();
                break;
            }
            case 'export': {
                downloadUserSettings();
                break;
            }
        }
    }, []);

    const handleConfirmImport = useCallback(() => {
        if (importDataToConfirm) {
            saveUserSettings(importDataToConfirm);
            setImportDataToConfirm(null);
            window.location.reload();
        }
    }, [importDataToConfirm]);

    return (
        <>
            <ButtonMenu
                icon={<ShareIcon />}
                text={t('button.share')}
                value={undefined}
                buttonProps={buttonProps}
                onClick={handleClick}
                options={[
                    {
                        key: 'copyAsText',
                        icon: <ContentCopyIcon />,
                        text: t('label.copyAsText'),
                        value: 'copyAsText',
                    },
                    {
                        key: 'export',
                        icon: <SaveIcon />,
                        text: t('label.exportToFile'),
                        value: 'export',
                    },
                    {
                        key: 'import',
                        icon: <FileOpenIcon />,
                        text: t('label.importFromFile'),
                        value: 'import',
                        disabled: !supportsShowOpenFilePicker(),
                    },
                ]}
            />
            {importDataToConfirm && (
                <ConfirmationDialog
                    title={t('myList.importConfirmTitle')}
                    question={(
                        <Stack>
                            <Alert severity="warning">{t('myList.importConfirmWarning')}</Alert>
                            <Box p={1}>
                                <Typography variant="body2" component="div">
                                    <pre>
                                        {importPreview}
                                    </pre>
                                </Typography>
                            </Box>
                        </Stack>
                    )}
                    onConfirm={handleConfirmImport}
                    onCancel={() => setImportDataToConfirm(null)}
                />
            )}
        </>
    );
};
