import { useMemo, useRef } from 'react';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IStation } from '../types/IMapContent';
import { createPlayerBaseIcon, createCityIcon, createDefaultStationIcon, createTextImage, mergeIconAndText, applyMarginToImage, createStrongholdIcon } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';

interface IImages {
    icon: HTMLCanvasElement;
    iconCenteredLabel: HTMLCanvasElement | null;
    textCenteredLabel: HTMLCanvasElement | null;
    iconCenteredLabelWithLevel: HTMLCanvasElement | null;
    textCenteredLabelWithLevel: HTMLCanvasElement | null;
}

interface IProps {
    station: IStation;
}

export const StationLabel = (props: IProps) => {
    const { station } = props;
    const coneVisible = useZoomBasedVisibility('stationCone');
    const stationLabelVisible = useZoomBasedVisibility('stationLabel');
    const cityIconVisible = useZoomBasedVisibility('cityIcon');
    const cityLabelVisible = useZoomBasedVisibility((station.type === 'city' && (station.level ?? 1) >= 7) ? 'cityLabel7up' : 'cityLabel');
    const cityLevelVisible = useZoomBasedVisibility('cityLevel');

    const position = useNormalizedPosition({
        gamePosition: station.position,
    });

    const updateIterationRef = useRef<number>(0);

    const images = useMemo<IImages>(() => {
        updateIterationRef.current++;
        const icon = getIcon(station);
        const text = getTextImage(station, false);
        const textWithLevel = showLevel(station) ? getTextImage(station, true) : null;

        return {
            icon,
            iconCenteredLabel: getIconCenteredLabelImage(icon, text),
            textCenteredLabel: getTextCenteredLabelImage(icon, text),
            iconCenteredLabelWithLevel: textWithLevel ? getIconCenteredLabelImage(icon, textWithLevel) : null,
            textCenteredLabelWithLevel: textWithLevel ? getTextCenteredLabelImage(icon, textWithLevel) : null,
        };
    }, [station, updateIterationRef]);

    switch (station.type) {
        case 'subCity':
        case 'city': {
            if (!cityIconVisible) {
                return null;
            }
            if (!cityLabelVisible) {
                // just show icon at city position
                return (
                    <CanvasSprite
                        key={`${station.id}_icon_${updateIterationRef.current}`}
                        canvas={images.icon}
                        gridPosition={position}
                    />
                );
            }

            if (!coneVisible) {
                // show label but keep the icon at city position
                return (
                    <CanvasSprite
                        key={`${station.id}_iconCenteredLabel_${cityLevelVisible}_${updateIterationRef.current}`}
                        canvas={(cityLevelVisible ? images.iconCenteredLabelWithLevel : null) ?? images.iconCenteredLabel ?? images.icon}
                        gridPosition={position}
                    />
                );
            }

            // show label above the city structure
            return (
                <CanvasSprite
                    key={`${station.id}_centeredLabel_${cityLevelVisible}_${updateIterationRef.current}`}
                    canvas={(cityLevelVisible ? images.textCenteredLabelWithLevel : null) ?? images.textCenteredLabel ?? images.icon}
                    gridPosition={position}
                />
            );
        }
        default: {
            if (!stationLabelVisible) {
                return null;
            }

            const labelImage = (showLevel(station) ? images.textCenteredLabelWithLevel : null) ?? images.textCenteredLabel ?? null;
            if (!labelImage) {
                return null;
            }

            return (
                <CanvasSprite
                    key={`${station.id}_label_${updateIterationRef.current}`}
                    canvas={labelImage}
                    gridPosition={position}
                />
            );
        }
    }
};

function getIcon(station: IStation): HTMLCanvasElement {
    switch (station.type) {
        case 'base': {
            return createPlayerBaseIcon(station.color);
        }
        case 'city': {
            return createCityIcon(station.level, station.color);
        }
        case 'stronghold': {
            return createStrongholdIcon(station.color);
        }
        case 'outpost':
        case 'platform': {
            // TODO new icon
            return createDefaultStationIcon(station.color);
        }
        default: {
            return createDefaultStationIcon(station.color);
        }
    }
}

function getTextImage(station: IStation, withLevel: boolean): HTMLCanvasElement | null {
    const labelText = getLabelText(station, withLevel);
    if (!labelText) {
        return null;
    }
    return createTextImage({
        text: labelText,
        fontSize: 12,
        color: station.color,
    });
}

function getLabelText(station: IStation, withLevel: boolean): string {
    const parts: string[] = [
        ...(station.name ? [station.name] : []),
        ...((withLevel && Number.isFinite(station.level)) ? [`Lv${station.level}`] : []),
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

    const image = textCanvas ?? iconCanvas ?? null;
    if (!image) {
        return null;
    }

    return applyMarginToImage({
        image,
        marginBottom: 90,
        backgroundColor: 'rgba(0,0,0,0.3)',
    });
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

function showLevel(station: IStation): boolean {
    switch (station.type) {
        case 'base':
        case 'stronghold':
            return false;
        default:
            return Number.isFinite(station.level);
    }
}
