import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { IFleetSetup } from './types/IFleetSetup';
import { IFleetShipCount } from './types/IFleetShipCount';
import { t } from '../../../i18n';

interface IProps {
    fleetSetup: IFleetSetup;
    fleetShipCount: IFleetShipCount;
}

export const FleetSetupBottomBar = (props: IProps) => {
    const { fleetSetup, fleetShipCount } = props;

    const exceedingCost = fleetShipCount.totalCost > fleetSetup.maxCost;
    const exceedingReinforcement = fleetSetup.totalReinforcementCount > fleetSetup.maxReinforcement;

    return (
        <Box component="div" sx={{ height: '100px' }}>
            <Paper square={true} sx={{ position: 'fixed', right: 0, bottom: 0, zIndex: 1, width: '100%', borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}>
                <Container maxWidth="md" disableGutters={true}>
                    <Box component="div" p={1}>
                        <Stack spacing={1} flexWrap="wrap" direction="row">
                            <Box component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('fleetSetup.reinforcement')}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: exceedingReinforcement ? 'red' : undefined }}
                                    >
                                        <strong>{`${fleetSetup.totalReinforcementCount} / ${fleetSetup.maxReinforcement}`}</strong>
                                    </Typography>
                                </div>
                            </Box>
                            <Box component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('fleetSetup.commandPoints')}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: exceedingCost ? 'red' : undefined }}
                                    >
                                        <strong>{`${fleetShipCount.totalCost} / ${fleetSetup.maxCost}`}</strong>
                                    </Typography>
                                </div>
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Paper>
        </Box>
    );
}
