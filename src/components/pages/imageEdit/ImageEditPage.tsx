import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { ImageEditor } from './ImageEditor';
import { useImageSelections } from './hooks/useImageSelections';
import { ImageEditActionBar } from './ImageEditActionBar';
import { EditorMode } from './types/editorMode';
import { ReorderList } from './ReorderList';
import { StepStepper } from './StepStepper';
import { t } from '../../../i18n';

const ImageEditPage = () => {
    const [mode, setMode] = useState<EditorMode>(EditorMode.CHOOSE_AND_REORDER);

    const {
        imageSelections,
        loading,
        addFiles,
        updateImageSelection,
        moveImageUp,
        moveImageDown,
        removeImage,
        clearImages,
        setModifier,
        getModifier,
        clearModifier,
    } = useImageSelections();

    const handleChangeEditorMode = useCallback((newMode: EditorMode) => {
        if (newMode === EditorMode.CHOOSE_AND_REORDER) {
            clearModifier();
        }
        setMode(newMode);
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <NavigationBar currentRoute="/imageEdit" />
            <ImageEditActionBar
                mode={mode}
                imageSelections={imageSelections}
                disabled={loading}
                onAddFiles={addFiles}
                onClearImages={clearImages}
                onChangeMode={handleChangeEditorMode}
            />
            <PageContent>
                <Box p={1}>
                    {mode === EditorMode.CHOOSE_AND_REORDER && (
                        <Stack pt={1} pb={1} spacing={2}>
                            <Typography variant="body2">
                                {t('imageEdit.pageDescription1')}
                            </Typography>
                            <Typography variant="body2">
                                {t('imageEdit.pageDescription2')}
                            </Typography>
                            <StepStepper step={EditorMode.CHOOSE_AND_REORDER} />
                            <ReorderList
                                imageSelections={imageSelections}
                                onMoveUp={moveImageUp}
                                onMoveDown={moveImageDown}
                                onRemove={removeImage}
                            />
                        </Stack>
                    )}
                    {mode === EditorMode.CUT_AND_MOVE && (
                        <Stack pt={1} pb={1} spacing={2}>
                            <StepStepper step={EditorMode.CUT_AND_MOVE} />
                            <Typography variant="body2">
                                {t('imageEdit.cutAndMoveDescription')}
                            </Typography>
                            <ImageEditor
                                imageSelections={imageSelections}
                                onUpdateImage={updateImageSelection}
                                onMoveUp={moveImageUp}
                                onMoveDown={moveImageDown}
                                onRemove={removeImage}
                                setModifier={setModifier}
                                getModifier={getModifier}
                            />
                        </Stack>
                    )}
                    {mode === EditorMode.PREVIEW_AND_CONFIRM && (
                        <Stack pt={1} pb={1} spacing={2}>
                            <StepStepper step={EditorMode.PREVIEW_AND_CONFIRM} />
                        </Stack>
                    )}
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default ImageEditPage;
