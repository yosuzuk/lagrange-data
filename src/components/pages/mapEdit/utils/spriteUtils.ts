import { normalizeLineEndings } from '../../../../utils/stringUtils';

interface ITextOptions {
    text: string;
    color?: string;
    font?: string;
    fontSize?: number;
    lineSpacing?: number;
    backgroundColor?: string;
    padding?: number;
    marginBottom?: number;
}

export function createTextImage(args: ITextOptions) {
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
}

export function createMarkerImage(color: string = 'white') {
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
}

export function createPlayerBaseIcon(color: string = 'white') {
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
}

export function createSunIcon(color: string = 'white') {
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
}

export function createLargePlanetIcon(color: string = 'white') {
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
}

export function createSmallPlanetIcon(color: string = 'white') {
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
}

export function createCityIcon(cityLevel: number | null, color: string = 'white') {
    const { canvas, ctx } = createCanvas();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;

    if (cityLevel && cityLevel >= 7) {
        canvas.width = 8;
        canvas.height = 8;
        ctx.strokeRect(0, 0, 8, 8);
        ctx.fillStyle = color;
        ctx.fillRect(2, 2, 4, 4);
        return canvas;
    }

    if (cityLevel && cityLevel >= 5) {
        canvas.width = 6;
        canvas.height = 6;
        ctx.strokeRect(0, 0, 6, 6);
        ctx.fillStyle = color;
        ctx.fillRect(2, 2, 2, 2);
        return canvas;
    }

    canvas.width = 4;
    canvas.height = 4;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 4, 4);
    return canvas;
}

interface IMergeIconAndTextArgs {
    iconCanvas: HTMLCanvasElement;
    textCanvas: HTMLCanvasElement;
    spacing: number;
    marginTop?: number;
    marginBottom?: number;
    padding?: number;
    backgroundColor?: string;
}

export function mergeIconAndText(args: IMergeIconAndTextArgs): HTMLCanvasElement {
    const { iconCanvas, textCanvas, spacing, marginTop = 0, marginBottom = 0, padding = 0, backgroundColor } = args;
    const { canvas, ctx } = createCanvas();
    canvas.width = iconCanvas.width + spacing + textCanvas.width + padding + padding;
    const contentHeight = Math.max(iconCanvas.height, textCanvas.height);
    canvas.height = marginTop + contentHeight + marginBottom + padding + padding;

    if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, marginTop, canvas.width, contentHeight + padding + padding);
    }

    const iconOffsetY = marginTop + padding + (contentHeight - iconCanvas.height) / 2;
    const textOffsetY = marginTop + padding + (contentHeight - textCanvas.height) / 2;
    ctx.drawImage(iconCanvas, padding, iconOffsetY);
    ctx.drawImage(textCanvas, padding + iconCanvas.width + spacing, textOffsetY);
    return canvas;
}

interface IApplyMarginArgs {
    image: HTMLCanvasElement;
    marginTop?: number;
    marginBottom?: number;
}

export function applyMarginToImage(args: IApplyMarginArgs): HTMLCanvasElement {
    const { image, marginTop = 0, marginBottom = 0 } = args;
    const { canvas, ctx } = createCanvas();
    canvas.width = image.width;
    canvas.height = marginTop + image.height + marginBottom;
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
