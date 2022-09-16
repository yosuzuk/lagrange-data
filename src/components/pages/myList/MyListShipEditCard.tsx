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
import { getModuleName, getShipName } from '../../../utils/shipDefinitionUtils';
import { t } from '../../../i18n';

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
                        {getShipName(ship)}
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
                    {(ship.source === ShipSource.TECH_FILE || ship.source === ShipSource.STARTER_SHIP)
                        && shipPossession === PossessionState.POSSESSED
                        && ship.modules
                        && ship.modules.filter(module => !module.defaultModule).map(module => {
                        const modulePossession = getModulePossession(module.id, ship.id, userSettings);
                        return (
                            <Box key={module.id} pl={2}>
                                <Stack spacing={3}>
                                    <Typography variant="h6">
                                        {`${module.category}${module.categoryNumber} ${getModuleName(ship.id, module)}`}
                                    </Typography>
                                    <PossessionControl
                                        label={t('myList.additionalModuleAcquiredOption')}
                                        options={[t('myList.blueprintAcquiredOptionYes'), t('myList.blueprintAcquiredOptionNo')]}
                                        possession={modulePossession}
                                        onChange={possession => setModulePossession(module.id, ship.id, possession)}
                                    />
                                    {modulePossession === PossessionState.NOT_POSSESSED && (
                                        <WishControl
                                            wish={getModuleWishState(module.id, ship.id, userSettings)}
                                            onChange={wish => setModuleWish(module.id, ship.id, wish)}
                                        />
                                    )}
                                </Stack>
                            </Box>
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
