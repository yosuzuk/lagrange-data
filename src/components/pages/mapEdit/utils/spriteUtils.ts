import { normalizeLineEndings } from '../../../../utils/stringUtils';

const staticCanvasMap = new Map<string, HTMLCanvasElement>();

type ITextOptions = {
    text: string;
    color?: string;
    font?: string;
    fontSize?: number;
    lineSpacing?: number;
    backgroundColor?: string;
    padding?: number;
    marginBottom?: number;
}

export const createTextImage = memoizeComplexCanvasFactory((args: ITextOptions) => {
    const {
        text,
        color = 'white',
        font = 'Arial',
        fontSize = 24,
        lineSpacing = 4,
        backgroundColor,
        padding = 0,
        marginBottom = 0,
    } = args;

    const lines = normalizeLineEndings(text).split('\n');

    const { canvas, ctx } = createCanvas();

    const fontStr = `${fontSize}px ${font}`;
    ctx.font = fontStr;
    canvas.width = Math.max(...lines.map(line => ctx.measureText(line).width)) + padding + padding;
    const lineHeight = Math.ceil(fontSize);
    const contentHeight = (lineHeight * lines.length) + (lineSpacing * (lines.length - 1)) + padding + padding;
    canvas.height = contentHeight + marginBottom;

    if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, contentHeight);
    }

    let offsetY = 0;
    lines.forEach((line: string) => {
        ctx.font = fontStr;
        ctx.fillStyle = color;
        ctx.fillText(line, padding, padding + offsetY + (lineHeight * 0.8));
        offsetY += (lineHeight + lineSpacing);
    });

    return canvas;
});

export const createMarkerImage = memoizeSimpleCanvasFactory((color: string = 'white') => {
    const { canvas, ctx } = createCanvas();
    const cubeSize = 5;
    const stickLength = 15;
    const paddingSide = 2;

    canvas.width = cubeSize + (2 * paddingSide);
    canvas.height = (stickLength + cubeSize) * 2; // double height because we cannot change the pivot point
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.fillRect(paddingSide, 0, 5, 5);
    ctx.beginPath();
    ctx.moveTo(paddingSide + 2.5, 5);
    ctx.lineTo(paddingSide + 2.5, 20);
    ctx.strokeStyle = color;
    ctx.stroke();
    return canvas;
});

export const createPlayerBaseIcon = memoizeSimpleCanvasFactory((color: string = 'white') => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 12;
    canvas.height = 12;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1, 5);
    ctx.lineTo(5, 1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(1, 7);
    ctx.lineTo(5, 11);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(7, 1);
    ctx.lineTo(11, 5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(7, 11);
    ctx.lineTo(11, 7);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(3, 6);
    ctx.lineTo(6, 3);
    ctx.lineTo(9, 6);
    ctx.lineTo(6, 9);
    ctx.fill();

    return canvas;
});

export const createSunIcon = memoizeSimpleCanvasFactory((color: string = 'white') => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 12;
    canvas.height = 12;
    ctx.setLineDash([2, 1]);
    ctx.beginPath();
    ctx.arc(6, 6, 5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(6, 6, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    return canvas;
});

export const createLargePlanetIcon = memoizeSimpleCanvasFactory((color: string = 'white') => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 12;
    canvas.height = 12;
    ctx.setLineDash([9.5, 4, 12.5, 2]);
    ctx.beginPath();
    ctx.arc(6, 6, 5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(6, 6, 2.75, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(2.1, 9.9, 1.1, 0, 2 * Math.PI, false);
    ctx.fill();
    return canvas;
});

export const createSmallPlanetIcon = memoizeSimpleCanvasFactory((color: string = 'white') => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 10;
    canvas.height = 10;
    ctx.setLineDash([9, 6, 12.5, 2]);
    ctx.beginPath();
    ctx.arc(5, 5, 4, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(2, 5, 1.8, 0, 2 * Math.PI, false);
    ctx.fill();
    return canvas;
});

export const createDefaultStationIcon = memoizeSimpleCanvasFactory((color: string = 'white') => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 8;
    canvas.height = 8;
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.strokeRect(1.5, 1.5, 5, 5);
    return canvas;
});

export const createStrongholdIcon = memoizeSimpleCanvasFactory((color: string = 'white') => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 10;
    canvas.height = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(1.5, 1.5 + 2);
    ctx.lineTo(1.5, 1.5);
    ctx.lineTo(canvas.width - 1.5, 1.5);
    ctx.lineTo(canvas.width - 1.5, 1.5 + 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(1.5, canvas.height - 1.5 - 2);
    ctx.lineTo(1.5, canvas.height - 1.5);
    ctx.lineTo(canvas.width - 1.5, canvas.height - 1.5);
    ctx.lineTo(canvas.width - 1.5, canvas.height - 1.5 - 2);
    ctx.stroke();
    return canvas;
});

export const createCityIcon = memoizeSimpleCanvasFactory((cityLevel: number | null, color: string = 'white') => {
    const { canvas, ctx } = createCanvas();

    if (cityLevel && cityLevel >= 7) {
        canvas.width = 13;
        canvas.height = 13;
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.strokeRect(1.5, 1.5, 10, 10);
        ctx.fillStyle = color;
        ctx.fillRect(4, 4, 5, 5);
        return canvas;
    }

    if (cityLevel && cityLevel >= 5) {
        canvas.width = 10;
        canvas.height = 10;
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.strokeRect(1.5, 1.5, 7, 7);
        ctx.fillStyle = color;
        ctx.fillRect(4, 4, 2, 2);
        return canvas;
    }

    canvas.width = 6;
    canvas.height = 6;
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 6, 6);
    return canvas;
});

export const createTargetSprite = memoizeStaticCanvasFactory('targetSprite', () => {
    const { canvas, ctx } = createCanvas();
    const w = 8;
    canvas.width = 60;
    canvas.height = 45;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(1.5 + w, 1.5);
    ctx.lineTo(1.5, 1.5);
    ctx.lineTo(1.5, canvas.height - 1.5);
    ctx.lineTo(1.5 + w, canvas.height - 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width - 1.5 - w, 1.5);
    ctx.lineTo(canvas.width - 1.5, 1.5);
    ctx.lineTo(canvas.width - 1.5, canvas.height - 1.5);
    ctx.lineTo(canvas.width - 1.5 - w, canvas.height - 1.5);
    ctx.stroke();
    return canvas;
});

export const createDockSprite = memoizeStaticCanvasFactory('dockSprite', () => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 60;
    canvas.height = 60;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 1.5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(0,0,0, 0.2)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 1.5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = 'rgb(80,80,80)';
    ctx.lineWidth = 2;
    ctx.stroke();
    const p = 16.5;
    const w = 6;
    ctx.beginPath();
    ctx.moveTo(p, canvas.height - p - w - 0.5);
    ctx.lineTo(p, p);
    ctx.lineTo(canvas.width - p - w - 0.5, p);
    ctx.strokeStyle = '#34eb34';
    ctx.lineWidth = w;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width - p, p + w + 0.5);
    ctx.lineTo(canvas.width - p, canvas.height - p);
    ctx.lineTo(p + w + 0.5, canvas.height - p);
    ctx.strokeStyle = '#34eb34';
    ctx.lineWidth = w;
    ctx.stroke();
    return canvas;
});

export const createDockIcon = memoizeStaticCanvasFactory('dockIcon', () => {
    const { canvas, ctx } = createCanvas();
    canvas.width = 15;
    canvas.height = 15;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 1.5, 0, 2 * Math.PI, false);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.75;
    ctx.stroke();
    const p = 4.5;
    const w = 1;
    ctx.beginPath();
    ctx.moveTo(p, canvas.height - p - w - 0.5);
    ctx.lineTo(p, p);
    ctx.lineTo(canvas.width - p - w - 0.5, p);
    ctx.strokeStyle = 'lightgreen';
    ctx.lineWidth = w;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width - p, p + w + 0.5);
    ctx.lineTo(canvas.width - p, canvas.height - p);
    ctx.lineTo(p + w + 0.5, canvas.height - p);
    ctx.strokeStyle = 'lightgreen';
    ctx.lineWidth = w;
    ctx.stroke();
    return canvas;
});

type IMergeIconAndTextArgs = {
    iconCanvas: HTMLCanvasElement;
    textCanvas: HTMLCanvasElement;
    spacing: number;
    marginTop?: number;
    marginBottom?: number;
    padding?: number;
    backgroundColor?: string;
    centerIcon?: boolean;
}

export function mergeIconAndText(args: IMergeIconAndTextArgs): HTMLCanvasElement {
    const { iconCanvas, textCanvas, spacing, marginTop = 0, marginBottom = 0, padding = 0, backgroundColor, centerIcon = false } = args;
    const { canvas, ctx } = createCanvas();

    const centeringOffset = centerIcon ? (textCanvas.width + spacing) : 0;

    canvas.width = [
        padding,
        centeringOffset,
        iconCanvas.width,
        spacing,
        textCanvas.width,
        padding,
    ].reduce((acc, next) => acc + next, 0);

    const contentHeight = Math.max(iconCanvas.height, textCanvas.height);
    canvas.height = marginTop + contentHeight + marginBottom + padding + padding;

    if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(centeringOffset, marginTop, canvas.width - centeringOffset, contentHeight + padding + padding);
    }

    const iconOffsetY = marginTop + padding + Math.ceil((contentHeight - iconCanvas.height) / 2);
    const textOffsetY = marginTop + padding + Math.ceil((contentHeight - textCanvas.height) / 2);
    ctx.drawImage(iconCanvas, padding + centeringOffset, iconOffsetY);
    ctx.drawImage(textCanvas, padding + centeringOffset + iconCanvas.width + spacing, textOffsetY);
    return canvas;
}

interface IApplyMarginArgs {
    image: HTMLCanvasElement;
    marginTop?: number;
    marginBottom?: number;
    backgroundColor?: string;
}

export function applyMarginToImage(args: IApplyMarginArgs): HTMLCanvasElement {
    const { image, marginTop = 0, marginBottom = 0, backgroundColor } = args;
    const { canvas, ctx } = createCanvas();
    canvas.width = image.width;
    canvas.height = marginTop + image.height + marginBottom;

    if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, marginTop, canvas.width, image.height);
    }

    ctx.drawImage(image, 0, marginTop);
    return canvas;
}

interface ICreatedCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

function createCanvas(): ICreatedCanvas {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        throw new Error('No canvas context');
    }

    return { canvas, ctx };
}

function memoizeSimpleCanvasFactory<T>(fn: T): T {
    const canvasCache: Record<string, HTMLCanvasElement> = {};

    if (typeof fn !== 'function') {
        throw new Error('');
    }

    return ((...args: unknown[]) => {
        const cacheKey = args.map(a => `${a}`).join();
        if (cacheKey in canvasCache) {
            return canvasCache[cacheKey];
        }
        const canvas = fn(...args);
        canvasCache[cacheKey] = canvas;
        return canvas;
    }) as T;
}

type TComplexCanvasFactory<TOptions> = (options: TOptions) => HTMLCanvasElement;

function memoizeComplexCanvasFactory<TOptions extends Record<string, unknown>>(fn: TComplexCanvasFactory<TOptions>): TComplexCanvasFactory<TOptions> {
    const canvasCache: Record<string, HTMLCanvasElement> = {};

    return (options: TOptions) => {
        const cacheKey = Object.values(options).join(',');
        if (cacheKey in canvasCache) {
            return canvasCache[cacheKey];
        }
        const canvas = fn(options);
        canvasCache[cacheKey] = canvas;
        return canvas;
    };
}

function memoizeStaticCanvasFactory(key: string, fn: () => HTMLCanvasElement): () => HTMLCanvasElement {
    if (staticCanvasMap.has(key)) {
        return () => staticCanvasMap.get(key) as HTMLCanvasElement;
    }
    const canvas = fn();
    staticCanvasMap.set(key, canvas);
    return () => canvas;
}
