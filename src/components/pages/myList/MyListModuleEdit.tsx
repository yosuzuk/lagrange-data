import { useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PossessionControl } from './PossessionControl';
import { WishControl } from './WishControl';
import { WishState } from '../../../userSettings/types/WishState';
import { PossessionState } from '../../../userSettings/types/PossessionState';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { getModulePossession, getModuleWishState } from '../../../userSettings/utils/userSettingsUtils';
import { getModuleName } from '../../../utils/shipDefinitionUtils';
import { getCurrentLanguage, Language, t } from '../../../i18n';
import { IUserSettings } from '../../../userSettings/types/UserSettings';

interface IProps {
    ship: IShipDefinition;
    module: ISystemModule;
    userSettings: IUserSettings;
    setModulePossession: (moduleId: string, shipId: string, possession: PossessionState) => void;
    setModuleWish: (moduleId: string, shipId: string, wish: WishState) => void;
}

export const MyListModuleEdit = (props: IProps) => {
    const { ship, module, userSettings, setModulePossession, setModuleWish } = props;

    const handleChangePossession = useCallback((possession: PossessionState) => {
        setModulePossession(module.id, ship.id, possession)
    }, [module, ship, setModulePossession]);

    const handleChangeWish = useCallback((wish: WishState) => {
        setModuleWish(module.id, ship.id, wish)
    }, [module, ship, setModuleWish]);

    const modulePossession = useMemo(() => getModulePossession(module.id, ship.id, userSettings), [module, ship, userSettings]);

    const descriptionAvailable = getCurrentLanguage() === Language.JAPANESE;

    return (
        <Box component="div" key={module.id} pl={2}>
            <Stack spacing={3}>
                <div>
                    <Typography variant="h6">
                        {`${module.category}${module.categoryNumber} ${getModuleName(ship.id, module)}`}
                    </Typography>
                    {descriptionAvailable && module.description && (
                        <Typography variant="caption" color="text.secondary">
                            {module.description}
                        </Typography>
                    )}
                </div>
                <PossessionControl
                    label={t('myList.additionalModuleAcquiredOption')}
                    options={[t('myList.blueprintAcquiredOptionYes'), t('myList.blueprintAcquiredOptionNo')]}
                    possession={modulePossession}
                    onChange={handleChangePossession}
                />
                {modulePossession === PossessionState.NOT_POSSESSED && (
                    <WishControl
                        wish={getModuleWishState(module.id, ship.id, userSettings)}
                        onChange={handleChangeWish}
                    />
                )}
            </Stack>
        </Box>
    );
};
