import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ResponsiveDialog } from './ResponsiveDialog';
import { t } from '../../i18n';
import { downloadJson } from '../../utils/file';
import { copyToClipboard } from '../../utils/clipboardUtils';

interface IProps {
    fileName: string;
    jsonContent: string;
    onClose: () => void;
    onStoreBackup?: () => void;
}

export const ExportDataDialog = (props: IProps) => {
    const { fileName, jsonContent, onClose, onStoreBackup } = props;
    const [copied, setCopied] = useState<boolean>(false);
    const [stored, setStored] = useState<boolean>(false);

    const handleDownloadFile = () => {
        downloadJson(jsonContent, fileName);
        onClose();
    };

    const handleStoreBackup = () => {
        if (onStoreBackup) {
            onStoreBackup();
            setStored(true);
        }
    };

    const handleCopy = () => {
        copyToClipboard(jsonContent).then(() => {
            setCopied(true);
        });
    };

    return (
        <ResponsiveDialog
            title={t('label.dataExport')}
            content={
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <Typography variant="body1">
                            {t('label.exportToFile')}
                        </Typography>
                        <Button variant="outlined" onClick={handleDownloadFile} startIcon={<DownloadIcon />}>
                            {t('button.downloadFile')}
                        </Button>
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="body1">
                            {t('label.directCopy')}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleCopy}
                            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                        >
                            {t('button.copyToClipboard')}
                        </Button>
                    </Stack>
                    {onStoreBackup && (
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {t('label.createBackup')}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={handleStoreBackup}
                                startIcon={stored ? <CheckIcon /> : <SaveIcon />}
                            >
                                {t('button.storeBackupInStorage')}
                            </Button>
                        </Stack>
                    )}
                </Stack>
            }
            onClose={onClose}
            actions={(
                <>
                    <Button variant="outlined" onClick={onClose}>
                        {t('button.close')}
                    </Button>
                </>
            )}
        />  
    );
};
