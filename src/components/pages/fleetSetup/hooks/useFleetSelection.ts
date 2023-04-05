import { useCallback, useMemo, useState } from 'react';
import { IFleetSetup } from '../types/IFleetSetup';
import { getCurrentFleetSetups } from '../utils/fleetSetupUtils';

interface IHookArguments {
    initialFleetKey: string | null;
}

interface IHookResult {
    fleetSetups: IFleetSetup[];
    fleetSetup: IFleetSetup;
}

export const useFleetSelection = (args: IHookArguments): IHookResult => {
    const { initialFleetKey } = args;
    const fleetSetups = useMemo<IFleetSetup[]>(() => getCurrentFleetSetups(), []);
    const fleetSetup = useMemo<IFleetSetup>(() => {
        if (!initialFleetKey) {
            return fleetSetups[0];
        }
        return fleetSetups.find(f => f.key === initialFleetKey) ?? fleetSetups[0];
    }, [initialFleetKey]);

    return {
        fleetSetups,
        fleetSetup,
    };
}
