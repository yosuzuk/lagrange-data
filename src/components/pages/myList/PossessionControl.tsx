import { MouseEvent } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PossessionState } from '../../../userSettings/types/PossessionState';
import { getShipDefinitionById } from '../../../utils/shipDefinitionUtils';
import { ShipSource } from '../../../types/ShipSource';

interface Props {
    shipId: string;
    possession: PossessionState;
    onChange: (shipId: string, possession: PossessionState) => void;
}

export const PossessionControl = (props: Props) => {
    const { shipId, possession, onChange } = props;

    const handleChange = (event: MouseEvent<HTMLElement>, value: string | null) => {
        onChange(shipId, value === null ? PossessionState.UNDEFINED : Number(value));
    };

    const sourceType: ShipSource = getShipDefinitionById(shipId).source;

    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="body1">{getLabelText(sourceType)}</Typography>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={`${possession}`}
                exclusive={true}
                onChange={handleChange}
            >
                <ToggleButton value={`${PossessionState.POSSESSED}`}>
                    {getToggleText(sourceType, true)}
                </ToggleButton>
                <ToggleButton value={`${PossessionState.NOT_POSSESSED}`}>
                    {getToggleText(sourceType, false)}
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

function getLabelText(sourceType: ShipSource) {
    switch (sourceType) {
        case ShipSource.CITY_TRADE: {
            return '都市で';
        }
        case ShipSource.DOCK_EFFECT: {
            return '臨時設計図を';
        }
        default: {
            return '設計図を';
        }
    }
}

function getToggleText(sourceType: ShipSource, positive: boolean) {
    switch (sourceType) {
        case ShipSource.CITY_TRADE: {
            return positive ? '買っている' : '買っていない';
        }
        default: {
            return positive ? '持っている' : '持っていない';
        }
    }
}
