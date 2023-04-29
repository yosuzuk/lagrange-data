import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IMapContent, IStation } from '../types/IMapContent';
import { Area } from './Area';
import { DockPlane } from './DockPlane';
import { StationCone } from './StationCone';
import { StationLabel } from './StationLabel';

interface IProps {
    station: IStation;
    onClick?: (content: IMapContent) => void;
}

export const Station = (props: IProps) => {
    const { station, onClick } = props;
    const stationConeVisible = useZoomBasedVisibility('stationCone');
    const dockConeVisible = useZoomBasedVisibility('dockCone');
    const coneVisible = station.type === 'dock' ? dockConeVisible : stationConeVisible;

    const position = useNormalizedPosition({
        gamePosition: station.position,
    });

    const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick?.(station);
    }, [onClick, station]);

    return (
        <>
            <StationCone
                name={station.id}
                visible={coneVisible}
                position={position}
                color={station.color}
                base={station.type === 'base'}
                onClick={handleClick}
            />
            <StationLabel station={station} onClick={handleClick} />
            {station.area && (
                <Area area={station.area} />
            )}
            {station.type === 'dock' && !station.area && (
                <DockPlane station={station} onClick={handleClick} />
            )}
        </>
    );
};
