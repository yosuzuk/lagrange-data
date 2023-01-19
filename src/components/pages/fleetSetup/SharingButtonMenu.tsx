import { useState, useCallback } from 'react';
import { ButtonProps } from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { t } from '../../../i18n';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';
import { downloadJson, openJson } from '../../../utils/file';
import { IFleetSetup, IMinifiedFleetSetup } from './types/IFleetSetup';
import { minifyFleetSetup, saveFleetSetup, unminifyFleetSetup } from './utils/fleetSetupUtils';
import { formatGroupedShipsForSharing, groupShipsBy } from './utils/shipGroupingUtils';
import { ImportDataDialog, TConfirmImportCallback, TCancelImportCallback } from '../../dialog/ImportDataDialog';

interface IProps {
    fleetSetup: IFleetSetup;
    grouping: string;
    onCopyAsText: () => void;
    buttonProps?: ButtonProps;
}

export const SharingButtonMenu = (props: IProps) => {
    const { fleetSetup, grouping, onCopyAsText, buttonProps } = props;
    const [importDialogOpened, setImportDialogOpened] = useState<boolean>(false);

    const handleSelectFile = useCallback((confirm: TConfirmImportCallback<IFleetSetup>, cancel: TCancelImportCallback) => {
        (async () => {
            const minified = await openJson<IMinifiedFleetSetup>();
            if (!minified) {
                cancel();
                return;
            }
            const unminifiedFleetSetup = unminifyFleetSetup(minified, fleetSetup.key);
            confirm(unminifiedFleetSetup);
        })();
    }, [fleetSetup]);

    const handleParse = useCallback((value: string): IFleetSetup | null => {
        let parsed: IMinifiedFleetSetup;
        try {
            parsed = JSON.parse(value) as IMinifiedFleetSetup;
        } catch (e) {
            console.log(e);
            return null;
        }
        return unminifyFleetSetup(parsed, fleetSetup.key);
    }, [fleetSetup]);

    const createPreview = useCallback((fleetSetup: IFleetSetup) => {
        const groupedShips = groupShipsBy(grouping, fleetSetup);
        return formatGroupedShipsForSharing(fleetSetup, groupedShips);
    }, [grouping]);

    const handleClick = useCallback((value: string) => {
        switch (value) {
            case 'copyAsText': {
                onCopyAsText();
                break;
            }
            case 'import': {
                setImportDialogOpened(true);
                break;
            }
            case 'export': {
                const minified = minifyFleetSetup(fleetSetup);
                downloadJson(JSON.stringify(minified), fleetSetup.name);
                break;
            }
        }
    }, [fleetSetup]);

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
                    confirmDialogTitle={t('fleetSetup.importConfirmTitle')}
                    confirmWarning={t('fleetSetup.importConfirmWarning', {
                        name: fleetSetup.name,
                    })}
                    createPreview={createPreview}
                    parseInput={handleParse}
                    onImport={handleImport}
                    onClose={() => setImportDialogOpened(false)}
                    onSelectFile={handleSelectFile}
                />
            )}
        </>
    );
};

function handleImport(fleetSetup: IFleetSetup) {
    saveFleetSetup(fleetSetup);
    setTimeout(() => {
        const url = new URL(window.location.href);
        window.location.href = `${url.origin}${url.pathname}#/fleetSetup/${fleetSetup.key}`;
        window.location.reload();
    }, 0);
}
