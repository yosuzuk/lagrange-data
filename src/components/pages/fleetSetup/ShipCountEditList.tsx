import { memo } from 'react';
import { ShipCountEditListItem } from './ShipCountEditListItem';
import Stack from '@mui/material/Stack';
import { IShipSelection, ReinforcementType } from './types/IFleetSetup';
import { IShipsForAddDialog } from './types/IShipsForAddDialog';

interface IProps {
    shipSelections?: IShipSelection[];
    shipsForAddDialog?: IShipsForAddDialog;
    showCost: boolean;
    showReinforcement: boolean;
    onChangeCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

const MemoizedShipCountEditListItem = memo(ShipCountEditListItem);

export const ShipCountEditList = (props: IProps) => {
    const { shipSelections, showCost, showReinforcement, shipsForAddDialog, onChangeCount } = props;

    return (
        <Stack spacing={1}>
            {shipSelections?.map(shipSelection => (
                <MemoizedShipCountEditListItem
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
            {shipsForAddDialog?.ships && shipsForAddDialog.ships.map(newShip => (
                <MemoizedShipCountEditListItem
                    key={`${newShip.shipDefinition.id}_${shipsForAddDialog.reinforcement ?? 'initial'}`}
                    shipDefinition={newShip.shipDefinition}
                    count={newShip.count}
                    maxCount={shipsForAddDialog.remainingCount !== null ? Math.min(newShip.maxCount, shipsForAddDialog.remainingCount + newShip.count) : newShip.maxCount}
                    reinforcement={shipsForAddDialog.reinforcement}
                    showCost={showCost}
                    showReinforcement={showReinforcement}
                    onChangeCount={onChangeCount}
                />
            ))}
        </Stack>
    );
}
