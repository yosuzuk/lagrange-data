import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IStation } from '../types/IMapContent';
import { StationCone } from './StationCone';

interface IProps {
    station: IStation;
}

export const Station = (props: IProps) => {
    const { station } = props;
    const coneVisible = useZoomBasedVisibility('stationCone');

    const position = useNormalizedPosition({
        gamePosition: station.position,
    });

    return (
        <>
            {coneVisible && (
                <StationCone position={position} color={station.color} base={station.type === 'base'} />
            )}
        </>
    );
};
