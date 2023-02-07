import { IImageSelection } from '../types/IImageSelection';

export async function filesToImageSelections(files: FileList): Promise<IImageSelection[]> {
    const result = await Promise.allSettled([...files].map(fileToImageSelection));
    const imageSelections: IImageSelection[] = [];
    result.forEach(r => {
        switch (r.status) {
            case 'fulfilled': {
                imageSelections.push(r.value);
                break;
            }
            case 'rejected': {
                console.error(`Failed to read image`, (r as PromiseRejectedResult).reason);
                break;
            }
        }
    });

    return imageSelections;
}

let idCounter = 0;

async function fileToImageSelection(file: File): Promise<IImageSelection> {
    return new Promise((resolve, reject) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        id: `image${idCounter++}`,
                        file,
                        dataUrl: `${fileReader.result}`,
                        imageInfo: {
                            aspectRatio: img.height / img.width,
                            width: img.width,
                            height: img.height,
                        },
                        canvasInfo: null,
                    });
                };
                img.onerror = (e) => {
                    reject(e);
                }
                img.src = `${fileReader.result}`;
            };
            fileReader.readAsDataURL(file);
        } catch (e) {
            reject(e);
        }
    });
}

export function sortImageSelections(imageSelections: IImageSelection[]): IImageSelection[] {
    return [...imageSelections].sort((a, b) => {
        return a.file.name.localeCompare(b.file.name, 'en');
    });
}

export function deduplicateImageSelections(imageSelections: IImageSelection[]): IImageSelection[] {
    const fileNames: Record<string, boolean> = {};
    const result: IImageSelection[] = [];
    imageSelections.forEach(selection => {
        if (fileNames[selection.file.name]) {
            return;
        }
        fileNames[selection.file.name] = true;
        result.push(selection);
    });
    return result;
}
