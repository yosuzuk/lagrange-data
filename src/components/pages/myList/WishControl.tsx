import { MouseEvent } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import { WishState } from '../../../userSettings/types/WishState';

interface IProps {
    wish: WishState;
    onChange: (wish: WishState) => void;
}

export const WishControl = (props: IProps) => {
    const { wish, onChange } = props;

    const handleChange = (event: MouseEvent<HTMLElement>, value: string | null) => {
        const clear = value === null || value === 'clear';
        onChange(clear ? WishState.UNDEFINED : Number(value));
    };

    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="body2">{'ガチャで'}</Typography>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={`${wish}`}
                exclusive={true}
                onChange={handleChange}
            >
                <ToggleButton value={`${WishState.WANTED}`}>{'出て欲しい'}</ToggleButton>
                <ToggleButton value={`${WishState.NOT_WANTED}`}>{'出て欲しくない'}</ToggleButton>
                {wish !== WishState.UNDEFINED && (
                    <ToggleButton value="clear">
                        <ClearIcon />
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        </Stack>
    );
};
