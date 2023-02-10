import { useRef, useCallback, Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ClearIcon from '@mui/icons-material/Clear';
import { ActionBar } from '../../actionBar/ActionBar';
import { t } from '../../../i18n';
import { IImageSelection } from './types/IImageSelection';
import { EditorMode } from './types/editorMode';
import { SharingButtonMenu } from './SharindButtonMenu';

interface IProps {
    mode: EditorMode;
    imageSelections: IImageSelection[];
    disabled: boolean;
    resultCanvas: HTMLCanvasElement | null;
    onAddFiles: (files: FileList) => void;
    onClearImages: () => void;
    onChangeMode: (mode: EditorMode) => void;
}

export const ImageEditActionBar = (props: IProps) => {
    const {
        mode,
        imageSelections,
        disabled,
        resultCanvas,
        onAddFiles,
        onClearImages,
        onChangeMode,
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
                    {mode === EditorMode.CHOOSE_AND_REORDER && (
                        <>
                            <Button
                                key="addFiles"
                                variant="outlined"
                                startIcon={imageSelections.length > 0 ? <AddPhotoAlternateIcon /> : <CollectionsIcon />}
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
                                    startIcon={<ClearIcon />}
                                    disabled={disabled}
                                    {...buttonProps}
                                >
                                    {t('button.reset')}
                                </Button>
                            )}
                        </>
                    )}
                    {mode === EditorMode.CUT_AND_MOVE && (
                        <>
                            <Button
                                key="backToChooseAndReorder"
                                variant="outlined"
                                onClick={() => onChangeMode(EditorMode.CHOOSE_AND_REORDER)}
                                startIcon={<NavigateBeforeIcon />}
                                {...buttonProps}
                            >
                                {t('button.back')}
                            </Button>
                        </>
                    )}
                    {mode === EditorMode.PREVIEW_AND_CONFIRM && (
                        <>
                            <Button
                                key="backToCutAndMove"
                                variant="outlined"
                                onClick={() => onChangeMode(EditorMode.CUT_AND_MOVE)}
                                startIcon={<NavigateBeforeIcon />}
                                {...buttonProps}
                            >
                                {t('button.back')}
                            </Button>
                        </>
                    )}
                </>
            )}
            right={buttonProps => (
                <>
                    {mode === EditorMode.CHOOSE_AND_REORDER && (
                        <>
                            <Button
                                key="nextToCutAndMove"
                                variant="outlined"
                                onClick={() => onChangeMode(EditorMode.CUT_AND_MOVE)}
                                endIcon={<NavigateNextIcon />}
                                disabled={imageSelections.length < 2}
                                {...buttonProps}
                            >
                                {t('button.next')}
                            </Button>
                        </>
                    )}
                    {mode === EditorMode.CUT_AND_MOVE && (
                        <>
                            <Button
                                key="nextToPreviewAndConfirm"
                                variant="outlined"
                                onClick={() => onChangeMode(EditorMode.PREVIEW_AND_CONFIRM)}
                                endIcon={<NavigateNextIcon />}
                                {...buttonProps}
                            >
                                {t('button.next')}
                            </Button>
                        </>
                    )}
                    {mode === EditorMode.PREVIEW_AND_CONFIRM && (
                        <>
                            <SharingButtonMenu
                                key="share"
                                resultCanvas={resultCanvas}
                                disabled={disabled || resultCanvas === null}
                                buttonProps={buttonProps}
                            />
                        </>
                    )}
                </>
            )}
        />
    );
}
