import { Fragment, useMemo } from 'react';
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
import { getModulePossession, getModuleWishState, getShipPossession, getShipWishState } from '../../../userSettings/utils/userSettingsUtils';

interface IProps {
    ship: IShipDefinition;
}

export const MyListShipEditCard = (props: IProps) => {
    const { ship, ...rest } = props;

    const { userSettings, setShipPossession, setShipWish, setModulePossession, setModuleWish } = useUserSettings();

    const shipPossession = getShipPossession(ship.id, userSettings);
    const shipWish = getShipWishState(ship.id, userSettings);

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
                    {ship.source === ShipSource.TECH_FILE
                        && shipPossession === PossessionState.POSSESSED
                        && ship.modules
                        && ship.modules.filter(module => !module.defaultModule).map(module => {
                        const modulePossession = getModulePossession(module.id, ship.id, userSettings);
                        return (
                            <Fragment key={module.id}>
                                <Typography variant="h6">
                                    {`${module.category}${module.categoryNumber} ${module.name}`}
                                </Typography>
                                <PossessionControl
                                    label={'システムを'}
                                    options={['持っている', '持っていない']}
                                    possession={modulePossession}
                                    onChange={possession => setModulePossession(module.id, ship.id, possession)}
                                />
                                {modulePossession !== PossessionState.POSSESSED && (
                                    <WishControl
                                        wish={getModuleWishState(module.id, ship.id, userSettings)}
                                        onChange={wish => setModuleWish(module.id, ship.id, wish)}
                                    />
                                )}
                            </Fragment>
                        );
                    })}
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
