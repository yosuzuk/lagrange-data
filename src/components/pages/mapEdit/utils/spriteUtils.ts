export function createMarkerImage(color: string = 'white') {
    const { canvas, ctx } = createCanvas();
    const cubeSize = 5;
    const paddingSide = 2;

    canvas.width = cubeSize + (2 * paddingSide);
    canvas.height = 20 * 2; // double height because we cannot change the pivot point
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
