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
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';
import { downloadJson, openJson, supportsShowOpenFilePicker } from '../../../utils/file';
import { IFleetSetup, IMinifiedFleetSetup } from './types/IFleetSetup';
import { minifyFleetSetup, saveFleetSetup, unminifyFleetSetup } from './utils/fleetSetupUtils';
import { formatGroupedShipsForSharing, groupShipsBy } from './utils/shipGroupingUtils';

interface IProps {
    fleetSetup: IFleetSetup;
    grouping: string;
    onCopyAsText: () => void;
    buttonProps?: ButtonProps;
}

export const SharingButtonMenu = (props: IProps) => {
    const { fleetSetup, grouping, onCopyAsText, buttonProps } = props;
    const [importDataToConfirm, setImportDataToConfirm] = useState<IFleetSetup | null>(null);

    const importPreview = useMemo<string | null>(() => {
        if (!importDataToConfirm) {
            return null;
        }
        const groupedShips = groupShipsBy(grouping, importDataToConfirm);
        return formatGroupedShipsForSharing(importDataToConfirm, groupedShips);
    }, [importDataToConfirm, grouping]);

    const handleClick = useCallback((value: string) => {
        switch (value) {
            case 'copyAsText': {
                onCopyAsText();
                break;
            }
            case 'import': {
                (async () => {
                    const minified = await openJson<IMinifiedFleetSetup>();
                    if (minified) {
                        const unminifiedFleetSetup = unminifyFleetSetup(minified, fleetSetup.key);
                        setImportDataToConfirm(unminifiedFleetSetup);
                    }
                })();
                break;
            }
            case 'export': {
                const minified = minifyFleetSetup(fleetSetup);
                downloadJson(JSON.stringify(minified), fleetSetup.name);
                break;
            }
        }
    }, [fleetSetup]);

    const handleConfirmImport = useCallback(() => {
        if (importDataToConfirm) {
            saveFleetSetup(importDataToConfirm);
            setImportDataToConfirm(null);
            const url = new URL(window.location.href);
            window.location.href = `${url.origin}${url.pathname}#/fleetSetup/${fleetSetup.key}`;
            window.location.reload();
        }
    }, [importDataToConfirm, fleetSetup]);

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
                    title={t('fleetSetup.importConfirmTitle')}
                    question={(
                        <Stack>
                            <Alert severity="warning">
                                {t('fleetSetup.importConfirmWarning', {
                                    name: fleetSetup.name,
                                })}
                            </Alert>
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
