import { useState, useCallback, useMemo } from 'react';
import { ButtonProps } from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { t } from '../../../i18n';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';
import { backupCurrentUserSettings, getCurrentSerializedUserSettings, openUserSettingsFromFile, parseUserSettings, readUserSettingsFromBackup, saveUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { formatShipListForSharing } from './utils/myListUtils';
import { extractPossesssedShips } from '../../filter/filterUtils';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { ImportDataDialog, TConfirmImportCallback, TCancelImportCallback } from '../../dialog/ImportDataDialog';
import { ExportDataDialog } from '../../dialog/ExportDataDialog';

interface IProps {
    onCopyAsText: () => void;
    buttonProps?: ButtonProps;
}

export const SharingButtonMenu = (props: IProps) => {
    const { onCopyAsText, buttonProps } = props;
    const [importDialogOpened, setImportDialogOpened] = useState<boolean>(false);
    const [userSettingsForExport, setUserSettingsForExport] = useState<string | null>(null);
    const [userSettingsBackup, setUserSettingsBackup] = useState<IUserSettings | null>(null);

    const handleClick = useCallback((value: string) => {
        switch (value) {
            case 'copyAsText': {
                onCopyAsText();
                break;
            }
            case 'import': {
                setUserSettingsBackup(readUserSettingsFromBackup());
                setImportDialogOpened(true);
                break;
            }
            case 'export': {
                setUserSettingsForExport(getCurrentSerializedUserSettings());
                break;
            }
        }
    }, []);

    const handleRestoreFromBackup = useCallback((confirm: TConfirmImportCallback<IUserSettings>, cancel: TCancelImportCallback) => {
        if (userSettingsBackup === null) {
            cancel();
            return;
        }
    
        confirm(userSettingsBackup);
    }, [userSettingsBackup]);

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
                        text: t('label.dataExport'),
                        value: 'export',
                    },
                    {
                        key: 'import',
                        icon: <FileOpenIcon />,
                        text: t('label.dataImport'),
                        value: 'import',
                    },
                ]}
            />
            {importDialogOpened && (
                <ImportDataDialog
                    confirmDialogTitle={t('myList.importConfirmTitle')}
                    confirmWarning={t('myList.importConfirmWarning')}
                    createPreview={createPreview}
                    parseInput={parseUserSettings}
                    canRestore={!!userSettingsBackup}
                    onImport={handleImport}
                    onClose={() => setImportDialogOpened(false)}
                    onSelectFile={handleSelectFile}
                    onRestoreFromBackup={handleRestoreFromBackup}
                />
            )}
            {userSettingsForExport && (
                <ExportDataDialog
                    fileName={'settings'}
                    jsonContent={userSettingsForExport}
                    onClose={() => setUserSettingsForExport(null)}
                    onStoreBackup={backupCurrentUserSettings}
                />
            )}
        </>
    );
};

function createPreview(userSettings: IUserSettings): string {
    const ships = extractPossesssedShips(shipDefinitions, userSettings.ships);
    return formatShipListForSharing(ships, userSettings);
}

function handleImport(userSettings: IUserSettings) {
    saveUserSettings(userSettings);
    setTimeout(() => {
        window.location.reload();
    }, 0);
}

function handleSelectFile(confirm: TConfirmImportCallback<IUserSettings>, cancel: TCancelImportCallback) {
    (async () => {
        const userSettings = await openUserSettingsFromFile();
        if (userSettings === null) {
            cancel();
            return;
        }

        confirm(userSettings);
    })();
}
