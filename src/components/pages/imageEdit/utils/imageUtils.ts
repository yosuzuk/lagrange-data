import { IImageModifier, IImageSelection } from '../types/IImageSelection';

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

export function createImageModifier(properties: Partial<IImageModifier> = {}): IImageModifier {
    return {
        cutTop: 0,
        moveUp: 0,
        ...properties,
    };
}

type TGetModifier = (selectionId: string) => IImageModifier;

export async function joinImageSelections(imageSelections: IImageSelection[], getModifier: TGetModifier): Promise<string | null> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        return null;
    }

    // prepare canvas
    canvas.width = calculateCanvasWidth(imageSelections);
    canvas.height = calculateCanvasHeight(imageSelections, getModifier);

    // draw each image
    let nextY = 0;
    for (const selection of imageSelections) {
        await new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
                const imageHeight = getCroppedHeight(selection, getModifier);
                const cutOff = selection.imageInfo.height - imageHeight;
                const moved = getVerticalMoveOffset(selection, getModifier);

                const sourceX = 0;
                const sourceY = cutOff;
                const sourceWidth = selection.imageInfo.width;
                const sourceHeight = imageHeight;
                const destinationX = 0;
                const destinationY = nextY - moved;
                const destinationWidth = selection.imageInfo.width;
                const destinationHeight = imageHeight;
                ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);

                nextY = destinationY + destinationHeight;
                resolve();
            };
            img.src = selection.dataUrl;
        });
    }
    return canvas.toDataURL('image/jpeg');
}

function calculateCanvasWidth(imageSelections: IImageSelection[]): number {
    return Math.max(...imageSelections.map(selection => selection.imageInfo.width));
}

function calculateCanvasHeight(imageSelections: IImageSelection[], getModifier: TGetModifier): number {
    return imageSelections.map(selection => {
        return getCroppedHeight(selection, getModifier) - getVerticalMoveOffset(selection, getModifier);
    }).reduce((sum, next) => sum + next, 0);
}

function getCroppedHeight(selection: IImageSelection, getModifier: TGetModifier): number {
    return Math.round(selection.imageInfo.height * (1 - getModifier(selection.id).cutTop));
}

function getVerticalMoveOffset(selection: IImageSelection, getModifier: TGetModifier) {
    return Math.round(selection.imageInfo.height * getModifier(selection.id).moveUp);
}
