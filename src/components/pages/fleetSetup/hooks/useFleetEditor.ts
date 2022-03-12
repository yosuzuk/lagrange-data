import { useCallback, useMemo, useState } from 'react';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../../userSettings/utils/userSettingsUtils';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { applyCarriedShipCount, applyShipCount, getCurrentFleetSetups } from '../utils/fleetSetupUtils';

interface IHookResult {
    fleetSetup: IFleetSetup;
    setFleetName: (fleetName: string) => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    setCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
}

export const useFleetEditor = (initialFleetKey?: string): IHookResult => {
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
    const fleetSetups = useMemo<IFleetSetup[]>(() => getCurrentFleetSetups(userSettings), [userSettings]);
    const [fleetSetup, setFleetSetup] = useState<IFleetSetup>(initialFleetKey ? fleetSetups.find(f => f.key === initialFleetKey) ?? fleetSetups[0] : fleetSetups[0]);

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
        fleetSetup,
        setFleetName,
        setShipCount,
        setCarriedShipCount,
    };
}
