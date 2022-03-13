import { ShipCountListItem } from './ShipCountListItem';
import Stack from '@mui/material/Stack';
import { IFleetSetup } from './types/IFleetSetup';
import { IShipsForAddDialog } from './types/IShipsForAddDialog';

interface IProps {
    fleetSetup?: IFleetSetup;
    shipsForAddDialog?: IShipsForAddDialog;
    showCost: boolean;
    showReinforcement: boolean;
}

export const ShipCountList = (props: IProps) => {
    const { fleetSetup, showCost, showReinforcement, shipsForAddDialog } = props;
    return (
        <Stack spacing={1}>
            {fleetSetup?.ships.map(shipSelection => (
                <ShipCountListItem
                    key={`${shipSelection.shipDefinition.id}_${shipSelection.reinforcement ?? 'initial'}`}
                    name={shipSelection.shipDefinition.name}
                    cost={shipSelection.shipDefinition.cost}
                    count={shipSelection.count}
                    maxCount={shipSelection.maxCount}
                    reinforcement={shipSelection.reinforcement}
                    showCost={showCost}
                    showReinforcement={showReinforcement}
                />
            ))}
            {shipsForAddDialog?.ships && Object.keys(shipsForAddDialog.ships).map(shipId => shipsForAddDialog.ships[shipId]).map(newShip => (
                <ShipCountListItem
                    key={`${newShip.shipDefinition.id}_${shipsForAddDialog.reinforcement ?? 'initial'}`}
                    name={newShip.shipDefinition.name}
                    cost={newShip.shipDefinition.cost}
                    count={newShip.count}
                    maxCount={newShip.maxCount}
                    reinforcement={shipsForAddDialog.reinforcement}
                    showCost={showCost}
                    showReinforcement={showReinforcement}
                />
            ))}
        </Stack>
    );
}
