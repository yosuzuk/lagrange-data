import SettingsIcon from '@mui/icons-material/Settings';
import { ITechPointConfig, ITechPointShipConfig } from './types/ITechPointConfig';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { IExpandable } from '../../expandStack.tsx/types/IExpandable';
import { TechPointShipSummary } from './TechPointShipSummary';
import { TechPointShipDetails } from './TechPointShipDetails';
import { useMemo } from 'react';

interface IProps {
    config: ITechPointConfig;
    onToggleModule: (shipId: string, moduleId: string) => void;
    onToggleEnhancement: (shipId: string, moduleId: string, enhancementId: string) => void;
    onToggleFavorite: (shipId: string) => void;
}

export const TechPointConfigList = (props: IProps) => {
    const { config, onToggleEnhancement, onToggleModule, onToggleFavorite } = props;
    const { openShipDetailDialog } = useShipDetail();

    const shipConfigs = useMemo(() => {
        const favorites: ITechPointShipConfig[] = [];
        const nonFavorites: ITechPointShipConfig[] = [];
        Object.values(config.ships).forEach(s => {
            (s.favorite ? favorites : nonFavorites).push(s);
        });
        return [...favorites, ...nonFavorites];
    }, [config]);

    return (
        <ExpandStack
            expandables={shipConfigs.map((shipConfig: ITechPointShipConfig): IExpandable => ({
                id: shipConfig.shipDefinition.id,
                initiallyOpened: false,
                expandIcon: <SettingsIcon />,
                summary: (
                    <TechPointShipSummary
                        shipConfig={shipConfig}
                        onClickName={openShipDetailDialog}
                        onToggleFavorite={onToggleFavorite}
                    />
                ),
                details: (
                    <TechPointShipDetails
                        shipConfig={shipConfig}
                        onToggleModule={onToggleModule}
                        onToggleEnhancement={onToggleEnhancement}
                    />
                ),
            }))}
        />
    );
};
