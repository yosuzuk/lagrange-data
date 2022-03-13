import { memo } from 'react';
import { ShipCountListItem } from './ShipCountListItem';
import Stack from '@mui/material/Stack';
import { IFleetSetup, ReinforcementType } from './types/IFleetSetup';
import { IShipsForAddDialog } from './types/IShipsForAddDialog';

interface IProps {
    fleetSetup?: IFleetSetup;
    shipsForAddDialog?: IShipsForAddDialog;
    showCost: boolean;
    showReinforcement: boolean;
    onChangeCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

const MemoizedShipCountListItem = memo(ShipCountListItem);

export const ShipCountList = (props: IProps) => {
    const { fleetSetup, showCost, showReinforcement, shipsForAddDialog, onChangeCount } = props;

    return (
        <Stack spacing={1}>
            {fleetSetup?.ships.map(shipSelection => (
                <MemoizedShipCountListItem
                    key={`${shipSelection.shipDefinition.id}_${shipSelection.reinforcement ?? 'initial'}`}
                    shipDefinition={shipSelection.shipDefinition}
                    count={shipSelection.count}
                    maxCount={shipSelection.maxCount}
                    reinforcement={shipSelection.reinforcement}
                    showCost={showCost}
                    showReinforcement={showReinforcement}
                    onChangeCount={onChangeCount}
                />
            ))}
            {shipsForAddDialog?.ships && Object.keys(shipsForAddDialog.ships).map(shipId => shipsForAddDialog.ships[shipId]).map(newShip => (
                <MemoizedShipCountListItem
                    key={`${newShip.shipDefinition.id}_${shipsForAddDialog.reinforcement ?? 'initial'}`}
                    shipDefinition={newShip.shipDefinition}
                    count={newShip.count}
                    maxCount={newShip.maxCount}
                    reinforcement={shipsForAddDialog.reinforcement}
                    showCost={showCost}
                    showReinforcement={showReinforcement}
                    onChangeCount={onChangeCount}
                />
            ))}
        </Stack>
    );
}
