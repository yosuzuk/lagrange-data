import { useCallback, useMemo, useState } from 'react';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { IShipsForAddDialog } from '../types/IShipsForAddDialog';
import { addSelectedShipsToFleetSetup, createShipsForAddDialog } from '../utils/shipAddDialogUtilts';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { applyShipCount, applyCarriedShipCount } from '../utils/fleetSetupUtils';
import { validateFleetSetupForShipWarnings } from '../utils/fleetSetupValidation';

interface IHookArguments {
    userSettings: IUserSettings;
    fleetSetup: IFleetSetup;
    setFleetSetup: (fleetSetup: IFleetSetup) => void;
}

interface IHookResult {
    shipsForAddDialog: IShipsForAddDialog | null;
    carrierShipId: string | null;
    shipWarnings: Record<string, string>;
    openForShips: (reinforcement: ReinforcementType | null, filter?: string) => void;
    openForCarriedShips: (carrierShipId: string, reinforcement: ReinforcementType | null, filter?: string) => void;
    cancel: () => void;
    apply: () => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    setCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const useShipsForAddDialog = (args: IHookArguments): IHookResult => {
    const { userSettings, fleetSetup, setFleetSetup } = args;
    const [shipsForAddDialog, setShipsForAddDialog] = useState<IShipsForAddDialog | null>(null);
    const [carrierShipId, setCarrierShipIdForAddDialog] = useState<string | null>(null);

    const openForShips = useCallback((reinforcement: ReinforcementType | null, filter?: string) => {
        setShipsForAddDialog(createShipsForAddDialog(reinforcement, fleetSetup, userSettings, filter ?? null));
    }, [fleetSetup, userSettings]);

    const openForCarriedShips = useCallback((carrierShipId: string, reinforcement: ReinforcementType | null) => {
        setCarrierShipIdForAddDialog(carrierShipId);
        // setShipsForAddDialog(); // TODO implement
    }, []);

    const cancel = useCallback(() => {
        setShipsForAddDialog(null);
        setCarrierShipIdForAddDialog(null);
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

    const setCarriedShipCount = useCallback((shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setShipsForAddDialog((shipsForAddDialog: IShipsForAddDialog | null) =>　!shipsForAddDialog ? null : ({
            ...shipsForAddDialog,
            fleetSetup: applyCarriedShipCount({
                shipId,
                carrierShipId,
                count,
                reinforcement,
                fleetSetup: shipsForAddDialog.fleetSetup,
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
        carrierShipId,
        shipWarnings,
        openForShips,
        openForCarriedShips,
        cancel,
        apply,
        setShipCount,
        setCarriedShipCount,
    };
};
