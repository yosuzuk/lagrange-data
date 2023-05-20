import SettingsIcon from '@mui/icons-material/Settings';
import { shipDefinitions as allShipDefinitions } from '../../../data/shipDefinitions';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { useTechPointConfig } from './hooks/useTechPointConfig';
import { ITechPointShipConfig } from './types/ITechPointConfig';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { IExpandable } from '../../expandStack.tsx/types/IExpandable';
import { TechPointShipSummary } from './TechPointShipSummary';
import { TechPointShipDetails } from './TechPointShipDetails';

interface IProps {
    shipDefinitions?: IShipDefinition[];
}

export const TechPointConfigList = (props: IProps) => {
    const { shipDefinitions = allShipDefinitions } = props;
    const { openShipDetailDialog } = useShipDetail();

    const {
        config,
        handleToggleModule,
        handleToggleEnhancement,
    } = useTechPointConfig({
        shipDefinitions,
    });

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
                        onToggleModule={handleToggleModule}
                        onToggleEnhancement={handleToggleEnhancement}
                    />
                ),
            }))}
        />
    );
};
