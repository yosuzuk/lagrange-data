import { memo } from 'react';
import { ShipCountEditListItem } from './ShipCountEditListItem';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { IModuleSelection, IShipSelection, ReinforcementType } from './types/IFleetSetup';
import { HangarData } from './HangarData';
import { ModuleData } from './ModuleData';
import { createShipWarningKey } from './utils/fleetSetupValidation';
import { ShipRow } from '../../../types/ShipRow';

interface IProps {
    shipSelections?: IShipSelection[];
    showCost: boolean;
    showReinforcement: boolean;
    showHangar: boolean;
    shipWarnings: Record<string, string>;
    showTune: boolean;
    carrierShipId: string | null;
    myListOnly: boolean;
    onChangeShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onChangeCarriedShipCount?: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    onOpenAddCarriedShips?: (carrierShipId: string, reinforcement: ReinforcementType | null) => void;
    onChangeModule?: (shipId: string, reinforcement: ReinforcementType | null, moduleSelection: IModuleSelection) => void;
    onChangeOverrides?: (shipId: string, row: ShipRow, cost: number) => void;
}

const MemoizedShipCountEditListItem = memo(ShipCountEditListItem);

export const ShipCountEditList = (props: IProps) => {
    const {
        shipSelections,
        showCost,
        showReinforcement,
        showHangar,
        shipWarnings,
        showTune,
        carrierShipId,
        myListOnly,
        onChangeShipCount,
        onChangeCarriedShipCount,
        onOpenAddCarriedShips,
        onChangeModule,
        onChangeOverrides,
    } = props;

    return (
        <Stack spacing={1}>
            {shipSelections?.map(shipSelection => (
                <Paper variant="outlined" key={`${shipSelection.shipDefinition.id}_${shipSelection.reinforcement ?? 'initial'}`}>
                    <Box component="div" p={1}>
                        <Stack spacing={1}>
                            <MemoizedShipCountEditListItem
                                shipDefinition={shipSelection.shipDefinition}
                                count={shipSelection.count}
                                maxCount={shipSelection.maxCount}
                                reinforcement={shipSelection.reinforcement}
                                rowOverride={shipSelection.rowOverride}
                                costOverride={shipSelection.costOverride}
                                showCost={showCost}
                                showReinforcement={showReinforcement}
                                showTune={showTune}
                                carrierShipId={carrierShipId}
                                onChangeShipCount={onChangeShipCount}
                                onChangeCarriedShipCount={onChangeCarriedShipCount}
                                onChangeOverrides={onChangeOverrides}
                                shipWarning={shipWarnings[createShipWarningKey(shipSelection.shipDefinition.id, shipSelection.reinforcement)]}
                            />
                            {shipSelection.moduleSelection && onChangeModule && (
                                <ModuleData
                                    shipId={shipSelection.shipDefinition.id}
                                    reinforcement={shipSelection.reinforcement}
                                    moduleSelection={shipSelection.moduleSelection}
                                    myListOnly={myListOnly}
                                    onChange={onChangeModule}
                                />
                            )}
                            {showHangar && shipSelection.carrierCapabilities.canCarry && (
                                <Stack spacing={1}>
                                    <HangarData shipSelection={shipSelection} onOpenAddCarriedShips={onOpenAddCarriedShips} />
                                    {shipSelection.carriedShips?.map(carriedShipSelection => (
                                        <MemoizedShipCountEditListItem
                                            key={`${shipSelection.shipDefinition.id}_${carriedShipSelection.shipDefinition.id}_${carriedShipSelection.reinforcement ?? 'initial'}`}
                                            shipDefinition={carriedShipSelection.shipDefinition}
                                            count={carriedShipSelection.count}
                                            maxCount={carriedShipSelection.shipDefinition.operationLimit}
                                            reinforcement={carriedShipSelection.reinforcement}
                                            rowOverride={undefined}
                                            costOverride={undefined}
                                            carrierShipId={shipSelection.shipDefinition.id}
                                            showCost={false}
                                            showReinforcement={false}
                                            showTune={showTune}
                                            onChangeCarriedShipCount={onChangeCarriedShipCount}
                                            shipWarning={shipWarnings[createShipWarningKey(carriedShipSelection.shipDefinition.id, shipSelection.reinforcement)]}
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                </Paper>
            ))}
        </Stack>
    );
}
