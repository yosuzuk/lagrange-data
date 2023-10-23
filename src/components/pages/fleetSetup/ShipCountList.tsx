import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IShipSelection } from './types/IFleetSetup';
import { useShipDetail } from '../../shipDetail/ShipDetailProvider';
import { ScriptedLink } from '../../link/ScriptedLink';
import { getShipName } from '../../../utils/shipDefinitionUtils';
import { t } from '../../../i18n';

interface IProps {
    shipSelections?: IShipSelection[];
}

export const ShipCountList = (props: IProps) => {
    const { shipSelections } = props;

    const { openShipDetailDialog } = useShipDetail();

    return (
        <Stack spacing={1}>
            {shipSelections?.map(shipSelection => (
                <Fragment key={`${shipSelection.shipDefinition.id}_${shipSelection.reinforcement ?? 'initial'}`}>
                    <Stack
                        spacing={1}
                        direction="row"
                    >
                        <Stack spacing={1} direction="row" flexWrap="wrap" sx={{ flexGrow: 1 }}>
                            <Box component="div" sx={{ width: '25px' }}>
                                <Typography variant="body2" textAlign="end">
                                    {`${shipSelection.count}×`}
                                </Typography>
                            </Box>
                            <Typography variant="body2">
                                <ScriptedLink onClick={() => { openShipDetailDialog(shipSelection.shipDefinition.id); }}>
                                    {getShipName(shipSelection.shipDefinition)}
                                </ScriptedLink>
                            </Typography>
                            {shipSelection.reinforcement === 'self' && (
                                <Typography variant="body2" noWrap={true}>
                                    {t('fleetSetup.reinforcementBrackets')}
                                </Typography>
                            )}
                            {shipSelection.reinforcement === 'ally' && (
                                <Typography variant="body2" noWrap={true}>
                                    {t('fleetSetup.orgReinforcementABrackets')}
                                </Typography>
                            )}
                            {shipSelection.reinforcement === 'ally2' && (
                                <Typography variant="body2" noWrap={true}>
                                    {t('fleetSetup.orgReinforcementBBrackets')}
                                </Typography>
                            )}
                            {shipSelection.reinforcement === 'ally3' && (
                                <Typography variant="body2" noWrap={true}>
                                    {t('fleetSetup.orgReinforcementCBrackets')}
                                </Typography>
                            )}
                        </Stack>
                        <Box component="div" sx={{ width: '50px' }}>
                            {shipSelection.reinforcement === null && (
                                <Typography variant="body2" textAlign="end">
                                    {`${(shipSelection.costOverride ?? shipSelection.shipDefinition.cost) * shipSelection.count} Pt`}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                    {shipSelection.carriedShips.map(carriedShip => (
                        <Stack
                            key={`${carriedShip.shipDefinition.id}_${carriedShip.reinforcement ?? 'initial'}`}
                            spacing={1}
                            direction="row"
                            flexWrap="wrap"
                        >
                            <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: '30px', opacity: 0.5 }}>
                                {`┗`}
                            </Typography>
                            <Box component="div" sx={{ width: '25px' }}>
                                <Typography variant="body2" textAlign="end">
                                    {`${carriedShip.count}×`}
                                </Typography>
                            </Box>
                            <Typography variant="body2">
                                <ScriptedLink onClick={() => { openShipDetailDialog(carriedShip.shipDefinition.id); }}>
                                    {getShipName(carriedShip.shipDefinition)}
                                </ScriptedLink>
                            </Typography>
                        </Stack>
                    ))}
                </Fragment>
            ))}
        </Stack>
    );
}
