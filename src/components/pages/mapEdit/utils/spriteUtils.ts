import { normalizeLineEndings } from '../../../../utils/stringUtils';

interface ITextOptions {
    text: string;
    color?: string;
    font?: string;
    fontSize?: number;
    lineSpacing?: number;
}

export function createTextImage(args: ITextOptions) {
    const {
        text,
        color = 'white',
        font = 'Arial',
        fontSize = 24,
        lineSpacing = 4,
    } = args;

    const lines = normalizeLineEndings(text).split('\n');

    const { canvas, ctx } = createCanvas();

    const fontStr = `${fontSize}px ${font}`;
    ctx.font = fontStr;
    canvas.width = Math.max(...lines.map(line => ctx.measureText(line).width));
    const lineHeight = Math.ceil(fontSize);
    canvas.height = (lineHeight * lines.length) + (lineSpacing * (lines.length - 1));

    let offsetY = 0;
    lines.forEach((line: string) => {
        ctx.font = fontStr;
        ctx.fillStyle = color;
        ctx.fillText(line, 0, offsetY + (lineHeight * 0.8));
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

export function createCityIcon(cityLevel: number, color: string = 'white') {
    const { canvas, ctx } = createCanvas();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;

    if (cityLevel >= 7) {
        canvas.width = 8;
        canvas.height = 8;
        ctx.strokeRect(0, 0, 8, 8);
        ctx.fillStyle = color;
        ctx.fillRect(2, 2, 4, 4);
        return canvas;
    }

    if (cityLevel >= 5) {
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
}

interface IMergeIconAndTextArgs {
    iconCanvas: HTMLCanvasElement;
    textCanvas: HTMLCanvasElement;
    spacing: number;
    marginTop?: number;
    marginBottom?: number;
}

export function mergeIconAndText(args: IMergeIconAndTextArgs): HTMLCanvasElement {
    const { iconCanvas, textCanvas, spacing, marginTop = 0, marginBottom = 0 } = args;
    const { canvas, ctx } = createCanvas();
    canvas.width = iconCanvas.width + spacing + textCanvas.width;
    const contentHeight = Math.max(iconCanvas.height, textCanvas.height);
    canvas.height = marginTop + contentHeight + marginBottom;
    const iconOffsetY = marginTop + (contentHeight - iconCanvas.height) / 2;
    const textOffsetY = marginTop + (contentHeight - textCanvas.height) / 2;
    ctx.drawImage(iconCanvas, 0, iconOffsetY);
    ctx.drawImage(textCanvas, iconCanvas.width + spacing, textOffsetY);
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
