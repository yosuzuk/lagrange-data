import { MouseEvent } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PossessionState } from '../../../userSettings/types/PossessionState';

interface IProps {
    label: string;
    possession: PossessionState;
    options: [string, string];
    onChange: (possession: PossessionState) => void;
}

export const PossessionControl = (props: IProps) => {
    const { label, options, possession, onChange } = props;

    const handleChange = (event: MouseEvent<HTMLElement>, value: string | null) => {
        onChange(value === null ? PossessionState.UNDEFINED : Number(value));
    };

    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="body1">{label}</Typography>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={`${possession}`}
                exclusive={true}
                onChange={handleChange}
            >
                <ToggleButton value={`${PossessionState.POSSESSED}`}>
                    {options[0]}
                </ToggleButton>
                <ToggleButton value={`${PossessionState.NOT_POSSESSED}`}>
                    {options[1]}
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};
