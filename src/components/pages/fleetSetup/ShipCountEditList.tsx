import { memo } from 'react';
import { ShipCountEditListItem } from './ShipCountEditListItem';
import Stack from '@mui/material/Stack';
import { IShipSelection, ReinforcementType } from './types/IFleetSetup';
import { getShipWarningKey } from './utils/fleetSetupValidation';

interface IProps {
    shipSelections?: IShipSelection[];
    showCost: boolean;
    showReinforcement: boolean;
    shipWarnings: Record<string, string>;
    onChangeCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

const MemoizedShipCountEditListItem = memo(ShipCountEditListItem);

export const ShipCountEditList = (props: IProps) => {
    const { shipSelections, showCost, showReinforcement, shipWarnings, onChangeCount } = props;

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
                    shipWarning={shipWarnings[getShipWarningKey(shipSelection.shipDefinition.id, shipSelection.reinforcement)]}
                />
            ))}
        </Stack>
    );
}
