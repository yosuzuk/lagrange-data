import { degreesToRadians } from '../../../../utils/math';
import { useDebug } from '../context/DebugContext';
import { useGridSize } from '../context/GridSizeContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { getRendeOrder } from '../utils/renderOrder';

export const MapGrid = () => {
    const gridSize = useGridSize();
    const gridVisibility = useZoomBasedVisibility('gameGrid');
    const debug = useDebug();

    return (
        <>
            {(gridVisibility || debug) && (
                <gridHelper
                    args={[
                        // size
                        gridSize,
                        // divisions
                        debug ? 10 : (gridVisibility ? gridSize : 1),
                        // colorCenterLine
                        '#3b3b40',
                        // colorGrid
                        '#3b3b40',
                    ]}
                    position={[0, 0, 0]}
                    rotation={[degreesToRadians(90), 0, 0]}
                    renderOrder={getRendeOrder('gridHelper')}
                />
            )}
        </>
    );
};
