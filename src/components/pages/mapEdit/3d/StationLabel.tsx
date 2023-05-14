import { ThreeEvent } from '@react-three/fiber';
import { useRef } from 'react';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IStation } from '../types/IMapContent';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    station: IStation;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

export const StationLabel = (props: IProps) => {
    const { station, onClick } = props;
    const coneVisible = useZoomBasedVisibility('stationCone');
    const stationLabelVisible = useZoomBasedVisibility('stationLabel');
    const baseIconVisible = useZoomBasedVisibility('baseIcon');
    const baseLabelVisible = useZoomBasedVisibility('baseLabel');
    const cityIconVisible = useZoomBasedVisibility('cityIcon');
    const subCityIconVisible = useZoomBasedVisibility('subCityIcon');
    const subCityLabelVisible = useZoomBasedVisibility('subCityLabel');
    const cityLabelVisible = useZoomBasedVisibility((station.type === 'city' && (station.level ?? 1) >= 7) ? 'cityLabel7up' : 'cityLabel');
    const cityLevelVisible = useZoomBasedVisibility('cityLevel');

    const position = useNormalizedPosition({
        gamePosition: station.position,
    });

    const updateIterationRef = useRef<number>(0);

    switch (station.type) {
        case 'subCity':
        case 'city': {
            const iconVisible = station.type === 'subCity' ? subCityIconVisible : cityIconVisible;
            const labelVisible = station.type === 'subCity' ? subCityLabelVisible : cityLabelVisible;
            const iconCenteredLabel = (cityLevelVisible ? station.iconCenteredLabelWithLevel : null) ?? station.iconCenteredLabel ?? station.icon;
            const centeredLabel = (cityLevelVisible ? station.textCenteredLabelWithLevel : null) ?? station.textCenteredLabel ?? station.icon;
            return (
                <group visible={iconVisible}>
                    <CanvasSprite
                        key={`${station.id}_icon_${updateIterationRef.current}`}
                        canvas={station.icon}
                        gridPosition={position}
                        visible={!labelVisible}
                        onClick={onClick}
                    />
                    {iconCenteredLabel && (
                        <CanvasSprite
                            key={`${station.id}_iconCenteredLabel_${cityLevelVisible}_${updateIterationRef.current}`}
                            canvas={iconCenteredLabel}
                            gridPosition={position}
                            visible={labelVisible && !coneVisible}
                            onClick={onClick}
                        />
                    )}
                    {centeredLabel && (
                        <CanvasSprite
                            key={`${station.id}_centeredLabel_${cityLevelVisible}_${updateIterationRef.current}`}
                            canvas={centeredLabel}
                            gridPosition={position}
                            visible={labelVisible && coneVisible}
                            onClick={onClick}
                        />
                    )}
                </group>
            );
        }
        case 'base': {
            const centeredLabel = station.textCenteredLabel ?? station.icon;
            return (
                <group visible={baseIconVisible}>
                    <CanvasSprite
                        key={`${station.id}_icon_${updateIterationRef.current}`}
                        canvas={station.icon}
                        gridPosition={position}
                        visible={!baseLabelVisible}
                        onClick={onClick}
                    />
                    {centeredLabel && (
                        <CanvasSprite
                            key={`${station.id}_centeredLabel_${cityLevelVisible}_${updateIterationRef.current}`}
                            canvas={centeredLabel}
                            gridPosition={position}
                            visible={baseLabelVisible}
                            onClick={onClick}
                        />
                    )}
                </group>
            );
        }
        default: {
            const labelImage = station.textCenteredLabelWithLevel ?? station.textCenteredLabel ?? null;
            if (!labelImage) {
                return null;
            }

            return (
                <CanvasSprite
                    key={`${station.id}_label_${updateIterationRef.current}`}
                    canvas={labelImage}
                    gridPosition={position}
                    visible={stationLabelVisible}
                    onClick={onClick}
                />
            );
        }
    }
};
