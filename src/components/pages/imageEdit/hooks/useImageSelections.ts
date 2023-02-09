import { useState, useCallback, useRef } from 'react';
import { IImageModifier, IImageSelection } from '../types/IImageSelection';
import { filesToImageSelections, sortImageSelections, deduplicateImageSelections, createImageModifier } from '../utils/imageUtils';

interface IHookResult {
    imageSelections: IImageSelection[];
    loading: boolean;
    addFiles: (files: FileList) => void;
    updateImageSelection: (selection: IImageSelection) => void;
    moveImageUp: (index: number) => void;
    moveImageDown: (index: number) => void;
    removeImage: (index: number) => void;
    clearImages: () => void;
    setModifier: (selectionId: string, modifier: Partial<IImageModifier>) => void;
    getModifier: (selectionId: string) => IImageModifier;
}

export const useImageSelections = (): IHookResult => {
    const [imageSelections, setImageSelections] = useState<IImageSelection[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const imageModifierRef = useRef<Record<string, IImageModifier>>({});

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

            if (index - 1 === 0) {
                delete imageModifierRef.current[newSelections[index - 1].id];
            };

            return newSelections;
        });
    }, []);

    const moveImageDown = useCallback((index: number) => {
        setImageSelections(selections => {
            const newSelections = [...selections];
            newSelections[index] = selections[index + 1];
            newSelections[index + 1] = selections[index];

            if (index === 0) {
                delete imageModifierRef.current[newSelections[index].id];
            };

            return newSelections;
        });
    }, []);

    const removeImage = useCallback((index: number) => {
        setImageSelections(selections => {
            const newSelections = [...selections];
            const removedSelection = newSelections.splice(index, 1);
            if (imageModifierRef.current[removedSelection[0].id]) {
                delete imageModifierRef.current[removedSelection[0].id];
            }
            return newSelections;
        });
    }, [imageModifierRef]);

    const clearImages = useCallback(() => {
        setImageSelections([]);
    }, []);

    const setModifier = useCallback((selectionId: string, modifier: Partial<IImageModifier>) => {
        const current = imageModifierRef.current[selectionId] ?? createImageModifier();
        imageModifierRef.current[selectionId] = { ...current, ...modifier };
    }, [imageModifierRef]);

    const getModifier = useCallback((selectionId: string): IImageModifier => {
        return imageModifierRef.current[selectionId] ?? createImageModifier();
    }, [imageModifierRef]);

    return {
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
    };
};
