import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { shipDefinitions as allShipDefinitions } from '../../../data/shipDefinitions';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { useTechPointConfig } from './hooks/useTechPointConfig';
import { ITechPointEnhancementConfig, ITechPointModuleConfig, ITechPointShipConfig } from './types/ITechPointConfig';
import { ScriptedLink } from '../../link/ScriptedLink';
import { getShipName } from '../../../utils/shipDefinitionUtils';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { IExpandable } from '../../expandStack.tsx/types/IExpandable';
import { t } from '../../../i18n';

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
                summary: (
                    <Stack spacing={1} direction="row" pr={2} sx={{ flexGrow: 1 }}>
                        <Box component="div" sx={{ flexGrow: 1, alignItems: 'center' }}>
                            <Typography variant="body1">
                                <ScriptedLink
                                    onClick={() => {
                                        openShipDetailDialog(shipConfig.shipDefinition.id);
                                    }}
                                >
                                    {getShipName(shipConfig.shipDefinition)}
                                </ScriptedLink>
                            </Typography>
                            {shipConfig.incomplete && (
                                <Typography variant="body2" sx={{ color: 'red' }}>
                                    {t('techPointConfig.incomplete')}
                                </Typography>
                            )}
                        </Box>
                        <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1">
                                {`TP: ${shipConfig.techPoints !== null ? `${shipConfig.techPoints} / ` : ''}${shipConfig.maxTechPoints !== null ? `${shipConfig.maxTechPoints}${shipConfig.incomplete ? '+' : ''}` : '?'}`}
                            </Typography>
                        </Box>
                    </Stack>
                ),
                details: (
                    <Stack spacing={1}>
                        {Object.values(shipConfig.modules).map((moduleConfig: ITechPointModuleConfig) => {
                            const moduleChecked = shipConfig.selectedModuleIds.includes(moduleConfig.module.id);
                            return (
                                <Stack key={moduleConfig.module.id} spacing={1}>
                                    <Stack spacing={1} direction="row">
                                        <div>
                                            <Switch
                                                checked={moduleChecked}
                                                onChange={() => {
                                                    handleToggleModule(shipConfig.shipDefinition.id, moduleConfig.module.id);
                                                }}
                                            />
                                        </div>
                                        <Box component="div" sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2">
                                                {`${moduleConfig.module.category !== 'STATIC' ? `${moduleConfig.module.category}${moduleConfig.module.categoryNumber}` : ''} ${moduleConfig.module.name}`}
                                            </Typography>
                                            {moduleConfig.incomplete && (
                                                <Typography variant="body2" sx={{ color: 'red' }}>
                                                    {t('techPointConfig.incomplete')}
                                                </Typography>
                                            )}
                                        </Box>
                                        <div>
                                            <Typography variant="body1">
                                                {`TP: ${!moduleChecked ? '0' : (moduleConfig.techPoints ?? '?')} / ${moduleConfig.maxTechPoints ?? '?'}`}
                                            </Typography>
                                        </div>
                                    </Stack>
                                    {moduleChecked && (
                                        <Stack spacing={1} pl={5} pt={1} pb={2}>
                                            <Typography variant="body1">
                                                {`Skill slots: ${moduleConfig.selectedEnhancementIds.length} / ${moduleConfig.module.skillSlots ?? '?'}`}
                                            </Typography>
                                            {Object.values(moduleConfig.enhancements).map((enhancementConfig: ITechPointEnhancementConfig) => {
                                                const checked = moduleConfig.selectedEnhancementIds.includes(enhancementConfig.id);
                                                return (
                                                    <Stack key={enhancementConfig.id} spacing={1} direction="row">
                                                        <div>
                                                            <Switch
                                                                checked={checked}
                                                                onChange={() => {
                                                                    handleToggleEnhancement(shipConfig.shipDefinition.id, moduleConfig.module.id, enhancementConfig.id);
                                                                }}
                                                                disabled={!checked && !!moduleConfig.module.skillSlots && moduleConfig.selectedEnhancementIds.length >= moduleConfig.module.skillSlots}
                                                            />
                                                        </div>
                                                        <Box component="div" sx={{ flexGrow: 1 }}>
                                                            <Typography variant="body2">
                                                                {`${enhancementConfig.enhancement.name}`}
                                                            </Typography>
                                                        </Box>
                                                        <div>
                                                            <Typography variant="body1">
                                                                {`TP: ${enhancementConfig.enhancement.cost ?? '?'}`}
                                                            </Typography>
                                                        </div>
                                                    </Stack>
                                                );
                                            })}
                                        </Stack>
                                    )}
                                </Stack>
                            );
                        })}
                        <Divider />
                        <Typography variant="body1" textAlign="end">
                            {`TP: ${shipConfig.techPoints !== null ? `${shipConfig.techPoints} / ` : ''}${shipConfig.maxTechPoints !== null ? `${shipConfig.maxTechPoints}${shipConfig.incomplete ? '+' : ''}` : '?'}`}
                        </Typography>
                    </Stack>
                ),
            }))}
        />
    );
};
