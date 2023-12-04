import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { ITechPointEnhancementConfig, ITechPointModuleConfig, ITechPointShipConfig } from './types/ITechPointConfig';
import { t } from '../../../i18n';
import { isExceedingSlotCount } from './utils/techPointConfigUtils';

interface IProps {
    shipConfig: ITechPointShipConfig;
    moduleConfig: ITechPointModuleConfig;
    enhancementConfig: ITechPointEnhancementConfig;
    onToggleEnhancement: (shipId: string, moduleId: string, enhancementId: string) => void;
}

export const TechPointEnhancementDetails = (props: IProps) => {
    const { shipConfig, moduleConfig, enhancementConfig, onToggleEnhancement } = props;

    const checked = moduleConfig.selectedEnhancementIds.includes(enhancementConfig.id);

    const wouldExceedSlotCountWhenEnabled = isExceedingSlotCount([...moduleConfig.selectedEnhancementIds, enhancementConfig.id], moduleConfig)

    return (
        <Stack spacing={1} direction="row">
            <div>
                <Switch
                    checked={checked}
                    color={enhancementConfig.enhancement.isDefault ? 'secondary' : 'primary'}
                    onChange={() => {
                        onToggleEnhancement(shipConfig.shipDefinition.id, moduleConfig.module.id, enhancementConfig.id);
                    }}
                    disabled={!checked && wouldExceedSlotCountWhenEnabled}
                />
            </div>
            <Box component="div" sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
                    <Typography variant="body2">
                        {`${enhancementConfig.enhancement.name}`}
                    </Typography>
                    {enhancementConfig.enhancement.properties.map((property, index) => (
                        <Typography key={`property_${index}`} variant="body2" color="text.secondary" sx={{ maxWidth: '80%' }}>
                            {property}
                        </Typography>
                    ))}
                    {enhancementConfig.enhancement.cost === null && (
                        <Typography variant="body2" sx={{ color: 'red' }}>
                            {t('techPointConfig.maxCostUnknown')}
                        </Typography>
                    )}
                </Stack>
            </Box>
        </Stack>
    );
};
