import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IStation } from '../types/IMapContent';
import { Area } from './Area';
import { StationCone } from './StationCone';
import { StationLabel } from './StationLabel';

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
            <StationCone name={station.id} visible={coneVisible} position={position} color={station.color} base={station.type === 'base'} />
            <StationLabel station={station} />
            {station.area && (
                <Area area={station.area} />
            )}
        </>
    );
};
