import { useState, useCallback } from 'react';
import { IImageSelection } from '../types/IImageSelection';
import { filesToImageSelections, sortImageSelections, deduplicateImageSelections } from '../utils/imageUtils';

interface IHookResult {
    imageSelections: IImageSelection[];
    loading: boolean;
    addFiles: (files: FileList) => void;
    updateImageSelection: (selection: IImageSelection) => void;
    moveImageUp: (index: number) => void;
    moveImageDown: (index: number) => void;
    removeImage: (index: number) => void;
    clearImages: () => void;
}

export const useImageSelections = (): IHookResult => {
    const [imageSelections, setImageSelections] = useState<IImageSelection[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const addFiles = useCallback((files: FileList) => {
        setLoading(true);
        (async () => {
            try {
                const newImageSelections = await filesToImageSelections(files);

                // remove duplicates but keep order for existing images and append new ones
                setImageSelections(selections => deduplicateImageSelections([
                    ...selections,
                    ...sortImageSelections(newImageSelections),
                ]));
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        })();
    }, []);

    const updateImageSelection = useCallback((newImageSelection: IImageSelection) => {
        setImageSelections(selections => selections.map(selection => selection.id !== newImageSelection.id ? selection : newImageSelection));
    }, []);

    const moveImageUp = useCallback((index: number) => {
        setImageSelections(selections => {
            const newSelections = [...selections];
            newSelections[index] = selections[index - 1];
            newSelections[index - 1] = selections[index];
            return newSelections;
        });
    }, []);

    const moveImageDown = useCallback((index: number) => {
        setImageSelections(selections => {
            const newSelections = [...selections];
            newSelections[index] = selections[index + 1];
            newSelections[index + 1] = selections[index];
            return newSelections;
        });
    }, []);

    const removeImage = useCallback((index: number) => {
        setImageSelections(selections => {
            const newSelections = [...selections];
            newSelections.splice(index, 1);
            return newSelections;
        });
    }, []);

    const clearImages = useCallback(() => {
        setImageSelections([]);
    }, []);

    return {
        imageSelections,
        loading,
        addFiles,
        updateImageSelection,
        moveImageUp,
        moveImageDown,
        removeImage,
        clearImages,
    };
};
