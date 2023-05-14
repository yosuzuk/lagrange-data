import { useEffect, useRef } from 'react';

interface IProps {
    canvas: HTMLCanvasElement;
}

export const CanvasClone = (props: IProps) => {
    const { canvas } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.getContext('2d')?.drawImage(canvas, 0, 0);
        }
    }, [canvasRef, canvas]);

    return (
        <canvas ref={canvasRef} width={canvas.width} height={canvas.height} />
    );
};
