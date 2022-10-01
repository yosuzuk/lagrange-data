import { useMemo, useCallback } from 'react';
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
import { getModulePossession, getShipPossession, getShipWishState } from '../../../userSettings/utils/userSettingsUtils';
import { getShipName } from '../../../utils/shipDefinitionUtils';
import { t } from '../../../i18n';
import { MyListModuleEdit } from './MyListModuleEdit';

interface IProps {
    ship: IShipDefinition;
}

export const MyListShipEditCard = (props: IProps) => {
    const { ship, ...rest } = props;

    const { userSettings, setShipPossession, setShipWish, setModulePossession, setModuleWish } = useUserSettings();

    const shipPossession = useMemo(() => getShipPossession(ship.id, userSettings), [ship, userSettings]);
    const shipWish = useMemo(() => getShipWishState(ship.id, userSettings), [ship, userSettings]);

    const enableShipWishControl = useMemo(() => {
        if (shipWish !== WishState.UNDEFINED) {
            return true;
        }

        return ship.source === ShipSource.TECH_FILE && shipPossession === PossessionState.NOT_POSSESSED;
    }, [ship, shipPossession, shipWish]);

    const handleChangePossession = useCallback((possession: PossessionState) => {
        setShipPossession(ship.id, possession);
    }, [setShipPossession, ship]);

    const handleChangeWish = useCallback((wish: WishState) => {
        setShipWish(ship.id, wish);
    }, [setShipWish, ship]);

    return (
        <Paper elevation={2} {...rest}>
            <Box p={1}>
                <Stack spacing={3}>
                    <Typography variant="h6">
                        {getShipName(ship)}
                    </Typography>
                    <PossessionControl
                        label={getShipPossessionLabelText(ship)}
                        options={getShipPossessionOptions(ship)}
                        possession={shipPossession}
                        onChange={handleChangePossession}
                    />
                    {enableShipWishControl && (
                        <WishControl
                            wish={shipWish}
                            onChange={handleChangeWish}
                        />
                    )}
                    {(ship.source === ShipSource.TECH_FILE || ship.source === ShipSource.STARTER_SHIP)
                        && shipPossession === PossessionState.POSSESSED
                        && ship.modules
                        && ship.modules.filter(module => !module.defaultModule).map(module => {
                        return (
                            <MyListModuleEdit
                                key={module.id}
                                ship={ship}
                                module={module}
                                userSettings={userSettings}
                                setModulePossession={setModulePossession}
                                setModuleWish={setModuleWish}
                            />
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
            return t('myList.shipBoughtOption');
        }
        case ShipSource.DOCK_EFFECT: {
            return t('myList.dockingEffectBlueprintAcquiredOption');
        }
        case ShipSource.SALVAGE: {
            return t('myList.salvageAcquiredOption');
        }
        default: {
            return t('myList.blueprintAcquiredOption');
        }
    }
}

function getShipPossessionOptions(ship: IShipDefinition): [string, string] {
    switch (ship.source) {
        case ShipSource.CITY_TRADE: {
            return [t('myList.shipBoughtOptionYes'), t('myList.shipBoughtOptionNo')];
        }
        default: {
            return [t('myList.blueprintAcquiredOptionYes'), t('myList.blueprintAcquiredOptionNo')];
        }
    }
}
