import { useCallback, useMemo, useState } from 'react';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { IShipsForAddDialog } from '../types/IShipsForAddDialog';
import { addSelectedShipsToFleetSetup, createShipsForAddDialog } from '../utils/shipAddDialogUtilts';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { applyShipCount } from '../utils/fleetSetupUtils';
import { validateFleetSetupForShipWarnings } from '../utils/fleetSetupValidation';

interface IHookArguments {
    userSettings: IUserSettings;
    fleetSetup: IFleetSetup;
    setFleetSetup: (fleetSetup: IFleetSetup) => void;
}

interface IHookResult {
    shipsForAddDialog: IShipsForAddDialog | null;
    shipWarnings: Record<string, string>;
    open: (reinforcement: ReinforcementType | null, filter?: string) => void;
    cancel: () => void;
    apply: () => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const useShipsForAddDialog = (args: IHookArguments): IHookResult => {
    const { userSettings, fleetSetup, setFleetSetup } = args;
    const [shipsForAddDialog, setShipsForAddDialog] = useState<IShipsForAddDialog | null>(null);

    const open = useCallback((reinforcement: ReinforcementType | null, filter?: string) => {
        setShipsForAddDialog(createShipsForAddDialog(reinforcement, fleetSetup, userSettings, filter ?? null));
    }, [fleetSetup, userSettings]);

    const cancel = useCallback(() => {
        setShipsForAddDialog(null);
    }, []);

    const apply = useCallback(() => {
        if (shipsForAddDialog) {
            setFleetSetup(addSelectedShipsToFleetSetup(shipsForAddDialog));
            setShipsForAddDialog(null);
        }
    }, [shipsForAddDialog, setFleetSetup]);

    const setShipCount = useCallback((shipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setShipsForAddDialog((shipsForAddDialog: IShipsForAddDialog | null) =>　!shipsForAddDialog ? null : ({
            ...shipsForAddDialog,
            fleetSetup: applyShipCount({
                shipId,
                count,
                reinforcement,
                fleetSetup: shipsForAddDialog.fleetSetup,
                userSettings,
                keepZero: true,
            }),
        }));
    }, [userSettings]);

    const shipWarnings = useMemo(() => {
        if (!shipsForAddDialog) {
            return {};
        }
        return validateFleetSetupForShipWarnings(shipsForAddDialog.fleetSetup);
    }, [shipsForAddDialog]);

    return {
        shipsForAddDialog,
        shipWarnings,
        open,
        cancel,
        apply,
        setShipCount,
    };
};
