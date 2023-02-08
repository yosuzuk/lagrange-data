import { useRef, useCallback } from 'react';
import Button from '@mui/material/Button';
import { ActionBar } from '../../actionBar/ActionBar';
import { t } from '../../../i18n';
import { IImageSelection } from './types/IImageSelection';

interface IProps {
    imageSelections: IImageSelection[];
    disabled: boolean;
    onAddFiles: (files: FileList) => void;
    onClearImages: () => void;
}

export const ImageEditActionBar = (props: IProps) => {
    const {
        imageSelections,
        disabled,
        onAddFiles,
        onClearImages,
    } = props;

    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleChangeImage = useCallback(() => {
        if (imageInputRef.current?.files?.length) {
            onAddFiles(imageInputRef.current.files);
            imageInputRef.current.value = '';
        }
    }, [onAddFiles, imageInputRef]);

    return (
        <ActionBar
            left={buttonProps => (
                <>
                    <Button
                        key="addFiles"
                        variant="outlined"
                        component="label"
                    >
                        {imageSelections.length > 0 ? t('button.addImages') : t('button.chooseImages')}
                        <input
                            hidden={true}
                            ref={imageInputRef}
                            type="file"
                            id="imageUpload"
                            name="imageUpload"
                            multiple={true}
                            disabled={disabled}
                            accept="image/jpeg"
                            onChange={handleChangeImage}
                        />
                    </Button>
                    {imageSelections.length > 0 && (
                        <Button
                            key="clearImages"
                            variant="outlined"
                            onClick={onClearImages}
                            disabled={disabled}
                            {...buttonProps}
                        >
                            {t('button.reset')}
                        </Button>
                    )}
                    
                </>
            )}
            right={buttonProps => (
                <>
                    <Button
                        key="share"
                        variant="outlined"
                        disabled={disabled || imageSelections.length === 0}
                        {...buttonProps}
                    >
                        {t('button.share')}
                    </Button>
                </>
            )}
        />
    );
}
