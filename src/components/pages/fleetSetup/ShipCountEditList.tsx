import { memo, Fragment } from 'react';
import { ShipCountEditListItem } from './ShipCountEditListItem';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { IShipSelection, ReinforcementType } from './types/IFleetSetup';
import { getShipWarningKey } from './utils/fleetSetupValidation';
import { HangarData } from './HangarData';

interface IProps {
    shipSelections?: IShipSelection[];
    showCost: boolean;
    showReinforcement: boolean;
    showHangar: boolean;
    shipWarnings: Record<string, string>;
    carrierShipId: string | null;
    onChangeShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onChangeCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onOpenAddCarriedShips?: (carrierShipId: string, reinforcement: ReinforcementType | null) => void;
}

const MemoizedShipCountEditListItem = memo(ShipCountEditListItem);

export const ShipCountEditList = (props: IProps) => {
    const {
        shipSelections,
        showCost,
        showReinforcement,
        showHangar,
        shipWarnings,
        carrierShipId,
        onChangeShipCount,
        onChangeCarriedShipCount,
        onOpenAddCarriedShips,
    } = props;

    return (
        <Stack spacing={1}>
            {shipSelections?.map(shipSelection => (
                <Fragment key={`${shipSelection.shipDefinition.id}_${shipSelection.reinforcement ?? 'initial'}`}>
                    <MemoizedShipCountEditListItem
                        shipDefinition={shipSelection.shipDefinition}
                        count={shipSelection.count}
                        maxCount={shipSelection.maxCount}
                        reinforcement={shipSelection.reinforcement}
                        showCost={showCost}
                        showReinforcement={showReinforcement}
                        carrierShipId={carrierShipId}
                        onChangeShipCount={onChangeShipCount}
                        onChangeCarriedShipCount={onChangeCarriedShipCount}
                        shipWarning={shipWarnings[getShipWarningKey(shipSelection.shipDefinition.id, shipSelection.reinforcement)]}
                    />
                    {showHangar && shipSelection.carrierCapabilities.canCarry && (
                        <Paper variant="outlined">
                            <Box p={1}>
                                <Stack spacing={1}>
                                    <HangarData shipSelection={shipSelection} onOpenAddCarriedShips={onOpenAddCarriedShips} />
                                    {shipSelection.carriedShips?.map(carriedShipSelection => (
                                        <MemoizedShipCountEditListItem
                                            key={`${shipSelection.shipDefinition.id}_${carriedShipSelection.shipDefinition.id}_${carriedShipSelection.reinforcement ?? 'initial'}`}
                                            shipDefinition={carriedShipSelection.shipDefinition}
                                            count={carriedShipSelection.count}
                                            maxCount={carriedShipSelection.shipDefinition.operationLimit}
                                            reinforcement={carriedShipSelection.reinforcement}
                                            carrierShipId={shipSelection.shipDefinition.id}
                                            showCost={false}
                                            showReinforcement={showReinforcement}
                                            onChangeCarriedShipCount={onChangeCarriedShipCount}
                                            shipWarning={shipWarnings[getShipWarningKey(carriedShipSelection.shipDefinition.id, carriedShipSelection.reinforcement)]}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </Paper>
                    )}
                </Fragment>
            ))}
        </Stack>
    );
}
