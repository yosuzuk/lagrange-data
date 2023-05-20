import SettingsIcon from '@mui/icons-material/Settings';
import { ITechPointConfig, ITechPointShipConfig } from './types/ITechPointConfig';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { IExpandable } from '../../expandStack.tsx/types/IExpandable';
import { TechPointShipSummary } from './TechPointShipSummary';
import { TechPointShipDetails } from './TechPointShipDetails';

interface IProps {
    config: ITechPointConfig;
    onToggleModule: (shipId: string, moduleId: string) => void;
    onToggleEnhancement: (shipId: string, moduleId: string, enhancementId: string) => void;
}

export const TechPointConfigList = (props: IProps) => {
    const { config, onToggleEnhancement, onToggleModule } = props;
    const { openShipDetailDialog } = useShipDetail();

    return (
        <ExpandStack
            expandables={Object.values(config.ships).map((shipConfig: ITechPointShipConfig): IExpandable => ({
                id: shipConfig.shipDefinition.id,
                initiallyOpened: false,
                expandIcon: <SettingsIcon />,
                summary: (
                    <TechPointShipSummary
                        shipConfig={shipConfig}
                        onClickName={openShipDetailDialog}
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
