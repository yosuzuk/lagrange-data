import { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PossessionControl } from './PossessionControl';
import { WishControl } from './WishControl';
import { WishState } from '../../../userSettings/types/WishState';
import { PossessionState } from '../../../userSettings/types/PossessionState';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipSource } from '../../../types/ShipSource';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';

interface IProps {
    ship: IShipDefinition;
}

export const MyListShipEditCard = (props: IProps) => {
    const { ship, ...rest } = props;

    const { userSettings, setShipPossession, setShipWish } = useUserSettings();

    const shipPossession = userSettings.ships[ship.id]?.possession ?? PossessionState.UNDEFINED;
    const shipWish = userSettings.ships[ship.id]?.wish ?? WishState.UNDEFINED;

    const enableShipWishControl = useMemo(() => {
        if (shipWish !== WishState.UNDEFINED) {
            return true;
        }

        return ship.source === ShipSource.TECH_FILE && shipPossession === PossessionState.NOT_POSSESSED;
    }, [ship, shipPossession, shipWish]);

    return (
        <Paper elevation={2} {...rest}>
            <Box p={1}>
                <Stack spacing={3}>
                    <Typography variant="h6">
                        {ship.name}
                    </Typography>
                    <PossessionControl
                        label={getShipPossessionLabelText(ship)}
                        options={getShipPossessionOptions(ship)}
                        possession={shipPossession}
                        onChange={possession => setShipPossession(ship.id, possession)}
                    />
                    {enableShipWishControl && (
                        <WishControl
                            wish={shipWish}
                            onChange={wish => setShipWish(ship.id, wish)}
                        />
                    )}
                </Stack>
            </Box>
        </Paper>
    );
};

function getShipPossessionLabelText(ship: IShipDefinition) {
    switch (ship.source) {
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

function getShipPossessionOptions(ship: IShipDefinition): [string, string] {
    switch (ship.source) {
        case ShipSource.CITY_TRADE: {
            return ['買っている', '買っていない'];
        }
        default: {
            return ['持っている', '持っていない'];
        }
    }
}
