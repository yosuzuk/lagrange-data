import { useCallback } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { t } from '../../../i18n';
import { ButtonMenu } from '../../buttonMenu/ButtonMenu';

interface IProps {
    resultCanvas: HTMLCanvasElement | null;
    buttonProps?: ButtonProps;
    disabled?: boolean;
}

export const SharingButtonMenu = (props: IProps) => {
    const { resultCanvas, buttonProps, disabled } = props;

    const handleClick = useCallback((value: string) => {
        if (resultCanvas === null) {
            return;
        }
        switch (value) {
            case 'copyToClipboard': {
                copyImageToClipboard(resultCanvas);
                break;
            }
            case 'downloadFile': {
                downloadImage(resultCanvas);
                break;
            }
        }
    }, [resultCanvas]);

    if (!canCopyToClipboard) {
        return (
            <Button
                variant="outlined"
                disabled={disabled || resultCanvas === null}
                startIcon={<DownloadIcon />}
                onClick={() => {
                    if (resultCanvas !== null) {
                        downloadImage(resultCanvas);
                    }
                }}
                {...buttonProps}
            >
                {t('button.downloadFile')}
            </Button>
        );
    }

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
                        key: 'copyToClipboard',
                        icon: <ContentCopyIcon />,
                        text: t('button.copyToClipboard'),
                        value: 'copyToClipboard',
                    },
                    {
                        key: 'downloadFile',
                        icon: <DownloadIcon />,
                        text: t('button.downloadFile'),
                        value: 'downloadFile',
                    },
                ]}
            />
        </>
    );
};

function downloadImage(canvas: HTMLCanvasElement) {
    var link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
}

async function copyImageToClipboard(canvas: HTMLCanvasElement) {
    return new Promise<void>((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob !== null) {
                try {
                    navigator.clipboard.write([
                        new ClipboardItem({
                            [blob.type]: Promise.resolve(blob),
                        }),
                    ]);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }
        }, 'image/png');
    });
}

function canCopyToClipboard() {
    return !!navigator.clipboard && !!ClipboardItem;
}
