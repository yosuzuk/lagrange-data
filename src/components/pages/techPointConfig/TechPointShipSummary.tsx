import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITechPointShipConfig } from './types/ITechPointConfig';
import { ScriptedLink } from '../../link/ScriptedLink';
import { getShipName } from '../../../utils/shipDefinitionUtils';
import { t } from '../../../i18n';
import { TechPointCounter } from './TechPointCounter';
import { ToggleFavorite } from '../../favorites/ToggleFavorite';

interface IProps {
    shipConfig: ITechPointShipConfig;
    onClickName: (shipId: string) => void;
    onToggleFavorite: (shipId: string) => void;
}

export const TechPointShipSummary = (props: IProps) => {
    const { shipConfig, onClickName, onToggleFavorite } = props;
    return (
        <Stack spacing={3} direction="row" pr={2} sx={{ flexGrow: 1 }}>
            <Box component="div" sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                <div>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Typography variant="body1">
                            <ScriptedLink
                                onClick={() => {
                                    onClickName(shipConfig.shipDefinition.id);
                                }}
                            >
                                {getShipName(shipConfig.shipDefinition)}
                            </ScriptedLink>
                        </Typography>
                        <ToggleFavorite
                            shipId={shipConfig.shipDefinition.id}
                            selected={shipConfig.favorite}
                            onToggle={onToggleFavorite}
                        />
                    </Stack>
                    {shipConfig.incomplete && (
                        <Typography variant="body2" sx={{ color: 'red' }}>
                            {t('techPointConfig.incomplete')}
                        </Typography>
                    )}
                </div>
            </Box>
            <TechPointCounter
                techPoints={shipConfig.techPoints}
                maxTechPoints={shipConfig.maxTechPoints}
                unlockCost={0}
                incomplete={shipConfig.incomplete}
            />
        </Stack>
    );
};
