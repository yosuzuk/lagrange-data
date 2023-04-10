import { useMemo, useRef, Fragment } from 'react';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IStation } from '../types/IMapContent';
import { createCityIcon, createPlayerBaseIcon, createTextImage, mergeIconAndText } from '../utils/spriteUtils';
import { Area } from './Area';
import { CanvasSprite } from './CanvasSprite';
import { StationCone } from './StationCone';

interface IProps {
    station: IStation;
}

interface IImages {
    icon: HTMLCanvasElement;
    iconCenteredLabel: HTMLCanvasElement | null;
    textCenteredLabel: HTMLCanvasElement | null;
    iconCenteredLabelWithLevel: HTMLCanvasElement | null;
    textCenteredLabelWithLevel: HTMLCanvasElement | null;
}

export const Station = (props: IProps) => {
    const { station } = props;
    const coneVisible = useZoomBasedVisibility('stationCone');
    const baseLabelVisible = useZoomBasedVisibility('baseLabel');
    const cityIconVisible = useZoomBasedVisibility('cityIcon');
    const cityLabelVisible = useZoomBasedVisibility((station.level ?? 1) >= 7 ? 'cityLabel7up' : 'cityLabel');
    const cityLevelVisible = useZoomBasedVisibility('cityLevel');

    const updateIterationRef = useRef<number>(0);

    const position = useNormalizedPosition({
        gamePosition: station.position,
    });

    const images = useMemo<IImages>(() => {
        updateIterationRef.current++;
        const icon = getIcon(station);
        const text = getTextImage(station, false);
        const textWithLevel = station.type === 'city' ? getTextImage(station, true) : null;

        return {
            icon,
            iconCenteredLabel: getIconCenteredLabelImage(icon, text),
            textCenteredLabel: getTextCenteredLabelImage(icon, text),
            iconCenteredLabelWithLevel: textWithLevel ? getIconCenteredLabelImage(icon, textWithLevel) : null,
            textCenteredLabelWithLevel: textWithLevel ? getTextCenteredLabelImage(icon, textWithLevel) : null,
        };
    }, [station, updateIterationRef]);

    return (
        <Fragment key={`${station.id}_${updateIterationRef.current}`}>
            {coneVisible && (
                <StationCone position={position} color={station.color} base={station.type === 'base'} />
            )}
            {station.type === 'base' && baseLabelVisible && images.textCenteredLabel && (
                <CanvasSprite
                    canvas={images.textCenteredLabel}
                    gridPosition={position}
                />
            )}
            {station.type === 'city' && cityIconVisible && (
                <>
                    {/* just show icon at city position */}
                    {!cityLabelVisible && (
                        <CanvasSprite
                            canvas={images.icon}
                            gridPosition={position}
                        />
                    )}
                    {/* show label but keep the icon at city position */}
                    {cityLabelVisible && !coneVisible && (
                        <CanvasSprite
                            canvas={(cityLevelVisible ? images.iconCenteredLabelWithLevel : null) ?? images.iconCenteredLabel ?? images.icon}
                            gridPosition={position}
                        />
                    )}
                    {/* show label above the city structure */}
                    {cityLabelVisible && coneVisible && (
                        <CanvasSprite
                            canvas={(cityLevelVisible ? images.textCenteredLabelWithLevel : null) ?? images.textCenteredLabel ?? images.icon}
                            gridPosition={position}
                        />
                    )}
                </>
            )}
            {station.area && (
                <Area area={station.area} />
            )}
        </Fragment>
    );
};

function getIcon(station: IStation): HTMLCanvasElement {
    switch (station.type) {
        case 'base': {
            return createPlayerBaseIcon(station.color);
        }
        case 'city': {
            return createCityIcon(station.level, station.color);
        }
        default: {
            // TODO defined default icon
            return createPlayerBaseIcon(station.color);
        }
    }
}

function getTextImage(station: IStation, cityLevelVisible: boolean): HTMLCanvasElement | null {
    const labelText = getLabelText(station, cityLevelVisible);
    if (!labelText) {
        return null;
    }
    return createTextImage({
        text: labelText,
        fontSize: 12,
        color: station.color,
    });
}

function getLabelText(station: IStation, cityLevelVisible: boolean): string {
    const parts: string[] = [
        ...(station.name ? [station.name] : []),
        ...((station.type === 'city' && station.level && cityLevelVisible) ? [`Lv${station.level}`] : []),
    ];
    return parts.join(' ');
}

function getTextCenteredLabelImage(iconCanvas: HTMLCanvasElement | null, textCanvas: HTMLCanvasElement | null): HTMLCanvasElement | null {
    if (iconCanvas && textCanvas) {
        return mergeIconAndText({
            iconCanvas,
            textCanvas,
            spacing: 4,
            padding: 1,
            marginBottom: 90,
            backgroundColor: 'rgba(0,0,0,0.3)',
        });
    }
    return textCanvas ?? iconCanvas ?? null;
}

function getIconCenteredLabelImage(iconCanvas: HTMLCanvasElement | null, textCanvas: HTMLCanvasElement | null): HTMLCanvasElement | null {
    if (iconCanvas && textCanvas) {
        return mergeIconAndText({
            iconCanvas,
            textCanvas,
            spacing: 4,
            padding: 1,
            centerIcon: true,
        });
    }
    return textCanvas ?? iconCanvas ?? null;
}
