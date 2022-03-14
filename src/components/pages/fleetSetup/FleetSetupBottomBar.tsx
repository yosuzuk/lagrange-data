import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { IFleetSetup } from './types/IFleetSetup';
import { IFleetShipCount } from './types/IFleetShipCount';

interface IProps {
    fleetSetup: IFleetSetup;
    fleetShipCount: IFleetShipCount;
}

export const FleetSetupBottomBar = (props: IProps) => {
    const { fleetSetup, fleetShipCount } = props;

    const exceedingCost = fleetShipCount.totalCost > fleetSetup.maxCost;
    const exceedingReinforcement = fleetSetup.totalReinforcementCount > fleetSetup.maxReinforcement;

    return (
        <Box sx={{ height: '100px' }}>
            <Paper square={true} sx={{ position: 'fixed', right: 0, bottom: 0, zIndex: 1, width: '100%' }}>
                <Container maxWidth="md" disableGutters={true}>
                    <Box p={1}>
                        <Stack spacing={1} flexWrap="wrap" direction="row">
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <Typography variant="body2" color="text.secondary">
                                        {'引き受け増援艦船数'}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: exceedingReinforcement ? 'red' : undefined }}
                                    >
                                        <strong>{`${fleetSetup.totalReinforcementCount} / ${fleetSetup.maxReinforcement}`}</strong>
                                    </Typography>
                                </div>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <Typography variant="body2" color="text.secondary">
                                        {'艦隊司令pt'}
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
