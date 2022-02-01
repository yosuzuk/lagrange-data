import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PossessionControl } from './PossessionControl';
import { WishControl } from './WishControl';
import { WishState } from '../../../userSettings/types/WishState';
import { PossessionState } from '../../../userSettings/types/PossessionState';

interface IProps {
    shipId: string;
    shipName: string;
    possession: PossessionState;
    wish: WishState;
    onPossessionChange: (shipId: string, possession: PossessionState) => void;
    onWishChange: (shipId: string, wish: WishState) => void;
}

export const MyListShipEditCard = (props: IProps) => {
    const { shipId, shipName, possession, wish, onPossessionChange, onWishChange, ...rest } = props;
    return (
        <Paper elevation={2} {...rest}>
            <Box p={1}>
                <Stack spacing={3}>
                    <Typography variant="h6">
                        {shipName}
                    </Typography>
                    <PossessionControl
                        shipId={shipId}
                        possession={possession}
                        onChange={onPossessionChange}
                    />
                    {possession === PossessionState.NOT_POSSESSED && (
                        <WishControl
                            shipId={shipId}
                            wish={wish}
                            onChange={onWishChange}
                        />
                    )}
                </Stack>
            </Box>
        </Paper>
    );
};

export const MemoizedMyListShipEditCard = React.memo(MyListShipEditCard);
