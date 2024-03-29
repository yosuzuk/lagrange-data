import { MouseEvent, useState, useEffect, useTransition } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ClearIcon from '@mui/icons-material/Clear';
import { WishState } from '../../../userSettings/types/WishState';
import { t } from '../../../i18n';

interface IProps {
    wish: WishState;
    onChange: (wish: WishState) => void;
}

export const WishControl = (props: IProps) => {
    const { wish, onChange } = props;
    const [localWish, setLocalWish] = useState<WishState>(wish);
    const [isPending, startTransition] = useTransition();

    const handleChange = (event: MouseEvent<HTMLElement>, value: string | null) => {
        const clear = value === null || value === 'clear';
        setLocalWish(clear ? WishState.UNDEFINED : Number(value));
    };

    useEffect(() => {
        startTransition(() => {
            onChange(localWish);
        });
    }, [localWish, onChange]);

    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="body2">{t('myList.wantOption')}</Typography>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={`${localWish}`}
                exclusive={true}
                onChange={handleChange}
            >
                <ToggleButton value={`${WishState.WANTED}`}>{t('myList.wantOptionYes')}</ToggleButton>
                <ToggleButton value={`${WishState.NOT_WANTED}`}>{t('myList.wantOptionNo')}</ToggleButton>
                {localWish !== WishState.UNDEFINED && (
                    <ToggleButton value="clear">
                        <ClearIcon />
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        </Stack>
    );
};
