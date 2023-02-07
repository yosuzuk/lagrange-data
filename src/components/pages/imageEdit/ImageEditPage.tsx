import Box from '@mui/material/Box';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { ImageEditor } from './ImageEditor';
import { useImageSelections } from './hooks/useImageSelections';
import { ImageEditActionBar } from './ImageEditActionBar';

const ImageEditPage = () => {
    const {
        imageSelections,
        loading,
        addFiles,
        updateImageSelection,
        moveImageUp,
        moveImageDown,
        removeImage,
        clearImages,
    } = useImageSelections();

    console.log(imageSelections);

    return (
        <>
            <NavigationBar currentRoute="/imageEdit" />
            <ImageEditActionBar
                imageSelections={imageSelections}
                disabled={loading}
                onAddFiles={addFiles}
                onClearImages={clearImages}
            />
            <PageContent>
                <Box p={1}>
                    <ImageEditor
                        imageSelections={imageSelections}
                        onUpdateImage={updateImageSelection}
                        onMoveUp={moveImageUp}
                        onMoveDown={moveImageDown}
                        onRemove={removeImage}
                    />
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default ImageEditPage;
