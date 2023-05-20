import Stack from '@mui/material/Stack';
import { ITechPointModuleConfig, ITechPointShipConfig } from './types/ITechPointConfig';
import { TechPointModuleDetails } from './TechPointModuleDetails';
import { TechPointCounter } from './TechPointCounter';

interface IProps {
    shipConfig: ITechPointShipConfig;
    onToggleModule: (shipId: string, moduleId: string) => void;
    onToggleEnhancement: (shipId: string, moduleId: string, enhancementId: string) => void;
}

export const TechPointShipDetails = (props: IProps) => {
    const { shipConfig, onToggleModule, onToggleEnhancement } = props;
    return (
        <Stack spacing={1} justifyContent="end">
            {Object.values(shipConfig.modules).map((moduleConfig: ITechPointModuleConfig) => (
                <TechPointModuleDetails
                    key={moduleConfig.module.id}
                    shipConfig={shipConfig}
                    moduleConfig={moduleConfig}
                    onToggleModule={onToggleModule}
                    onToggleEnhancement={onToggleEnhancement}
                />
            ))}
            <Stack justifyContent="end" flexDirection="row" sx={{ paddingRight: '40px' }}>
                <TechPointCounter
                    techPoints={shipConfig.techPoints}
                    maxTechPoints={shipConfig.maxTechPoints}
                    incomplete={shipConfig.incomplete}
                />
            </Stack>
        </Stack>
    );
};
