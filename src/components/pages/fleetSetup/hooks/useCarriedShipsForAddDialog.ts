import { useCallback, useMemo, useState } from 'react';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { IDialogDataForCarriedShips } from '../types/IDialogDataForShips';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { addSelectedCarriedShipsToFleetSetup, createDialogDataForCarriedShips } from '../utils/carriedShipAddDialogUtils';

interface IHookArguments {
    userSettings: IUserSettings;
    fleetSetup: IFleetSetup;
    setFleetSetup: (fleetSetup: IFleetSetup) => void;
}

interface IHookResult {
    dialogData: IDialogDataForCarriedShips | null;
    shipWarnings: Record<string, string>;
    open: (carrierShipId: string, reinforcement: ReinforcementType | null, filter?: string) => void;
    cancel: () => void;
    apply: () => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const useCarriedShipsForAddDialog = (args: IHookArguments): IHookResult => {
    const { userSettings, fleetSetup, setFleetSetup } = args;
    const [dialogData, setDialogData] = useState<IDialogDataForCarriedShips | null>(null);

    const open = useCallback((carrierShipId: string, reinforcement: ReinforcementType | null) => {
        setDialogData(createDialogDataForCarriedShips(carrierShipId, reinforcement, fleetSetup, userSettings));
    }, [fleetSetup, userSettings]);

    const cancel = useCallback(() => {
        setDialogData(null);
    }, []);

    const apply = useCallback(() => {
        if (dialogData) {
            setFleetSetup(addSelectedCarriedShipsToFleetSetup(dialogData, fleetSetup));
            setDialogData(null);
        }
    }, [dialogData, fleetSetup, setFleetSetup]);

    const setShipCount = useCallback((shipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setDialogData(dialogData => !dialogData ? null : ({
            ...dialogData,
            shipSelections: dialogData.shipSelections.map(shipSelection => {
                if (shipSelection.shipDefinition.id !== shipId || shipSelection.reinforcement !== reinforcement) {
                    return shipSelection;
                }
                return {
                    ...shipSelection,
                    count,
                };
            }),
        }));
    }, [userSettings]);

    const shipWarnings = useMemo(() => {
        if (!dialogData) {
            return {};
        }
        // TODO check operationLimit overflow across carriers
        // return validateFleetSetupForShipWarnings(carriedShipsForAddDialog, fleetSetup);
        return {};
    }, [dialogData, fleetSetup]);

    return {
        dialogData,
        shipWarnings,
        open,
        cancel,
        apply,
        setShipCount,
    };
};
