import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { ITechPointEnhancementConfig, ITechPointModuleConfig, ITechPointShipConfig } from './types/ITechPointConfig';
import { getModuleName } from '../../../utils/shipDefinitionUtils';
import { t } from '../../../i18n';
import { TechPointEnhancementDetails } from './TechPointEnhancementDetails';
import { TechPointCounter } from './TechPointCounter';
import { useColorMode } from '../../../theme/context/ThemeProvider';

interface IProps {
    shipConfig: ITechPointShipConfig;
    moduleConfig: ITechPointModuleConfig;
    onToggleModule: (shipId: string, moduleId: string) => void;
    onToggleEnhancement: (shipId: string, moduleId: string, enhancementId: string) => void;
}

export const TechPointModuleDetails = (props: IProps) => {
    const { shipConfig, moduleConfig, onToggleModule, onToggleEnhancement } = props;
    const { mode } = useColorMode();

    const moduleChecked = shipConfig.selectedModuleIds.includes(moduleConfig.module.id);

    const selectedEnhancementForOpenSlotCount = moduleConfig.selectedEnhancementIds.filter(x => !moduleConfig.enhancements[x].enhancement.isDefault).length;

    return (
        <Stack p={2} spacing={1} sx={{ 'backgroundColor': mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(229, 229, 229, 0.5)' }}>
            <Stack spacing={1} direction="row">
                <div>
                    <Switch
                        checked={moduleChecked}
                        disabled={moduleConfig.module.category === 'STATIC'}
                        onChange={() => {
                            onToggleModule(shipConfig.shipDefinition.id, moduleConfig.module.id);
                        }}
                    />
                </div>
                <Box component="div" sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                    <Box component="div" sx={{ flexGrow: 1 }}>
                        <Typography variant="body2">
                            {`${moduleConfig.module.category !== 'STATIC' ? `${moduleConfig.module.category}${moduleConfig.module.categoryNumber}` : ''} ${getModuleName(shipConfig.shipDefinition.id, moduleConfig.module)}`}
                        </Typography>
                        {moduleConfig.incomplete && (
                            <Typography variant="body2" sx={{ color: 'red' }}>
                                {t('techPointConfig.incomplete')}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <TechPointCounter
                    techPoints={moduleChecked ? moduleConfig.techPoints : 0}
                    maxTechPoints={moduleConfig.maxTechPoints}
                    unlockCost={(moduleConfig.module.category !== 'STATIC' && !moduleConfig.module.defaultModule) ? 10 : null}
                    selected={moduleChecked}
                    incomplete={moduleConfig.incomplete}
                    showZero={true}
                />
            </Stack>
            {moduleChecked && (
                <Stack spacing={3} pl={5} pt={1} pb={2}>
                    <div>
                        <Typography variant="body1" color="text.secondary">
                            {t('techPointConfig.enhancementSlotsColonValue', {
                                value: `${selectedEnhancementForOpenSlotCount} / ${moduleConfig.module.skillSlots ?? '?'}`
                            })}
                        </Typography>
                        {!moduleConfig.module.skillSlots && (
                            <Typography variant="body2" sx={{ color: 'red' }}>
                                {t('techPointConfig.incomplete')}
                            </Typography>
                        )}
                    </div>
                    {Object.values(moduleConfig.enhancements).map((enhancementConfig: ITechPointEnhancementConfig) => (
                        <TechPointEnhancementDetails
                            key={enhancementConfig.id}
                            shipConfig={shipConfig}
                            moduleConfig={moduleConfig}
                            enhancementConfig={enhancementConfig}
                            onToggleEnhancement={onToggleEnhancement}
                        />
                    ))}
                </Stack>
            )}
        </Stack>
    );
};
