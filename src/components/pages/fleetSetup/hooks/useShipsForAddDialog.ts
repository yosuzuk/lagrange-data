import { useCallback, useMemo, useState } from 'react';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { IDialogDataForShips } from '../types/IDialogDataForShips';
import { addSelectedShipsToFleetSetup, createDialogDataForShips } from '../utils/shipAddDialogUtilts';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { applyShipCount } from '../utils/fleetSetupUtils';
import { validateFleetSetupForShipWarnings } from '../utils/fleetSetupValidation';

interface IHookArguments {
    userSettings: IUserSettings;
    fleetSetup: IFleetSetup;
    setFleetSetup: (fleetSetup: IFleetSetup) => void;
}

interface IHookResult {
    dialogData: IDialogDataForShips | null;
    shipWarnings: Record<string, string>;
    open: (reinforcement: ReinforcementType | null, filter?: string) => void;
    cancel: () => void;
    apply: () => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const useShipsForAddDialog = (args: IHookArguments): IHookResult => {
    const { userSettings, fleetSetup, setFleetSetup } = args;
    const [dialogData, setDialogData] = useState<IDialogDataForShips | null>(null);

    const open = useCallback((reinforcement: ReinforcementType | null, filter?: string) => {
        setDialogData(createDialogDataForShips(reinforcement, fleetSetup, userSettings, filter ?? null));
    }, [fleetSetup, userSettings]);

    const cancel = useCallback(() => {
        setDialogData(null);
    }, []);

    const apply = useCallback(() => {
        if (dialogData) {
            setFleetSetup(addSelectedShipsToFleetSetup(dialogData));
            setDialogData(null);
        }
    }, [dialogData, setFleetSetup]);

    const setShipCount = useCallback((shipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setDialogData((dialogData: IDialogDataForShips | null) =>　!dialogData ? null : ({
            ...dialogData,
            fleetSetup: applyShipCount({
                shipId,
                count,
                reinforcement,
                fleetSetup: dialogData.fleetSetup,
                keepZero: true,
            }),
        }));
    }, [userSettings]);

    const shipWarnings = useMemo(() => {
        if (!dialogData) {
            return {};
        }
        return validateFleetSetupForShipWarnings(dialogData.fleetSetup);
    }, [dialogData]);

    return {
        dialogData,
        shipWarnings,
        open,
        cancel,
        apply,
        setShipCount,
    };
};
