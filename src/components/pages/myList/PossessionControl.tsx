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
            <Typography variant="body2">{'設計図を'}</Typography>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={`${possession}`}
                exclusive={true}
                onChange={handleChange}
            >
                <ToggleButton value={`${PossessionState.POSSESSED}`}>
                    {sourceType === ShipSource.CITY_TRADE ? '買っている' : '持っている'}
                </ToggleButton>
                <ToggleButton value={`${PossessionState.NOT_POSSESSED}`}>
                    {sourceType === ShipSource.CITY_TRADE ? '買っていない' : '持っていない'}
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};
