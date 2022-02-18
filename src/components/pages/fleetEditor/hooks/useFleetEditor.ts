import { useCallback, useState } from 'react';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { IFleetSetup } from '../types/IFleetSetup';
import { applyCarriedShipCount, applyShipCount } from '../utils/fleetSetupUtils';

interface IHookArguments {
    userSettings: IUserSettings;
}

interface IHookResult {
    fleetSetup: IFleetSetup | null;
    setFleetSetup: (fleetSetup: IFleetSetup | null) => void;
    setShipCount: (shipId: string, count: number) => void;
    setCarriedShipCount: (shipId: string, carrierShipId: string, count: number) => void;
}

export const useFleetEditor = (args: IHookArguments): IHookResult => {
    const { userSettings } = args;

    const [fleetSetup, setFleetSetup] = useState<IFleetSetup | null>(null);

    const setShipCount = useCallback((shipId: string, count: number) => {
        setFleetSetup(fleetSetup => fleetSetup ? applyShipCount(shipId, count, fleetSetup, userSettings) : null);
    }, [userSettings]);

    const setCarriedShipCount = useCallback((shipId: string, carrierShipId: string, count: number) => {
        setFleetSetup(fleetSetup => fleetSetup ? applyCarriedShipCount(shipId, carrierShipId, count, fleetSetup) : null);
    }, []);

    return {
        fleetSetup,
        setFleetSetup,
        setShipCount,
        setCarriedShipCount,
    };
}
