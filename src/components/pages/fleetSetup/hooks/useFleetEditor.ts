import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { applyCarriedShipCount, applyShipCount, createFleetSetup, getCurrentFleetSetups, saveFleetSetup } from '../utils/fleetSetupUtils';
import { validateFleetSetupForPropertyErrors, validateFleetSetupForShipWarnings } from '../utils/fleetSetupValidation';

interface IHookArguments {
    initialFleetKey?: string;
    userSettings: IUserSettings;
}

interface IHookResult {
    fleetSetup: IFleetSetup;
    errors: Record<string, string>;
    shipWarnings: Record<string, string>;
    setFleetSetup: (fleetSetup: IFleetSetup) => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    setCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    save: () => void;
    reset: () => void;
}

export const useFleetEditor = (args: IHookArguments): IHookResult => {
    const { initialFleetKey, userSettings } = args;
    const navigate = useNavigate();
    const fleetSetups = useMemo<IFleetSetup[]>(() => getCurrentFleetSetups(userSettings), [userSettings]);
    const [fleetSetup, setFleetSetup] = useState<IFleetSetup>(initialFleetKey ? fleetSetups.find(f => f.key === initialFleetKey) ?? fleetSetups[0] : fleetSetups[0]);

    const setShipCount = useCallback((shipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setFleetSetup(fleetSetup => applyShipCount({ shipId, count, reinforcement, fleetSetup, userSettings }));
    }, [userSettings]);

    const setCarriedShipCount = useCallback((shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setFleetSetup(fleetSetup => applyCarriedShipCount({ shipId, carrierShipId, count, reinforcement, fleetSetup }));
    }, []);

    const save = useCallback(() => {
        saveFleetSetup(fleetSetup);
        navigate('/fleetSetup');
    }, [fleetSetup]);

    const reset = useCallback(() => {
        const fleetNumber = Number(fleetSetup.key.substring('fleet'.length));
        setFleetSetup(createFleetSetup(fleetNumber));
    }, [fleetSetup]);

    const errors = useMemo(() => validateFleetSetupForPropertyErrors(fleetSetup), [fleetSetup]);

    const shipWarnings = useMemo(() => validateFleetSetupForShipWarnings(fleetSetup), [fleetSetup]);

    return {
        fleetSetup,
        errors,
        shipWarnings,
        setFleetSetup,
        setShipCount,
        setCarriedShipCount,
        save,
        reset,
    };
}
