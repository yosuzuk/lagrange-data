import { useCallback, useMemo, useState } from 'react';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../../userSettings/utils/userSettingsUtils';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { applyCarriedShipCount, applyShipCount, getCurrentFleetSetups } from '../utils/fleetSetupUtils';

interface IHookResult {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
    switchFleet: (fleetKey: string) => void;
    setFleetName: (fleetName: string) => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    setCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const useFleetEditor = (): IHookResult => {
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
    const fleetSetups = useMemo<IFleetSetup[]>(() => getCurrentFleetSetups(userSettings), [userSettings]);
    const [fleetSetup, setFleetSetup] = useState<IFleetSetup>(fleetSetups[0]);

    const switchFleet = useCallback((fleetKey: string) => {
        const fleetSetup = fleetSetups.find(fleetSetup => fleetSetup.key === fleetKey);
        if (!fleetSetup) {
            throw new Error(`Invalid fleet key "${fleetKey}"`);
        }
        setFleetSetup(fleetSetup);
    }, [fleetSetups]);

    const setFleetName = useCallback((fleetName: string) => {
        setFleetSetup(fleetSetup => ({
            ...fleetSetup,
            name: fleetName,
        }));
    }, []);

    const setShipCount = useCallback((shipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setFleetSetup(fleetSetup => applyShipCount({ shipId, count, reinforcement, fleetSetup, userSettings }));
    }, [userSettings]);

    const setCarriedShipCount = useCallback((shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setFleetSetup(fleetSetup => applyCarriedShipCount({ shipId, carrierShipId, count, reinforcement, fleetSetup }));
    }, []);

    return {
        fleetSetups,
        fleetSetup,
        switchFleet,
        setFleetName,
        setShipCount,
        setCarriedShipCount,
    };
}
