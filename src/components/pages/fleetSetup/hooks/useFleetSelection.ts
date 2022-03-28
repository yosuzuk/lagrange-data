import { useCallback, useMemo, useState } from 'react';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../../userSettings/utils/userSettingsUtils';
import { IFleetSetup } from '../types/IFleetSetup';
import { getCurrentFleetSetups } from '../utils/fleetSetupUtils';

interface IHookArguments {
    initialFleetKey: string | null;
}

interface IHookResult {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
    switchFleet: (fleetKey: string) => void;
}

export const useFleetSelection = (args: IHookArguments): IHookResult => {
    const { initialFleetKey } = args;
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
    const fleetSetups = useMemo<IFleetSetup[]>(() => getCurrentFleetSetups(userSettings), [userSettings]);
    const [fleetSetup, setFleetSetup] = useState<IFleetSetup>(initialFleetKey ? fleetSetups.find(f => f.key === initialFleetKey) ?? fleetSetups[0] : fleetSetups[0]);

    const switchFleet = useCallback((fleetKey: string) => {
        const fleetSetup = fleetSetups.find(fleetSetup => fleetSetup.key === fleetKey);
        if (!fleetSetup) {
            throw new Error(`Invalid fleet key "${fleetKey}"`);
        }
        setFleetSetup(fleetSetup);
    }, [fleetSetups]);

    return {
        fleetSetups,
        fleetSetup,
        switchFleet,
    };
}
