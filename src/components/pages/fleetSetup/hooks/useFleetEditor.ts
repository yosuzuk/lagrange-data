import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFleetSetup, IModuleSelection, ReinforcementType } from '../types/IFleetSetup';
import { applyCarriedShipCount, applyOverrides, applyModules, applyShipCount, createFleetSetup, getCurrentFleetSetups, saveFleetSetup } from '../utils/fleetSetupUtils';
import { validateFleetSetupForPropertyErrors, validateFleetSetupForShipWarnings } from '../utils/fleetSetupValidation';
import { ShipRow } from '../../../../types/ShipRow';

interface IHookArguments {
    initialFleetKey?: string;
}

interface IHookResult {
    fleetSetup: IFleetSetup;
    errors: Record<string, string>;
    shipWarnings: Record<string, string>;
    setFleetSetup: (fleetSetup: IFleetSetup) => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    setCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    setModule: (shipId: string, reinforcement: ReinforcementType | null, moduleSelection: IModuleSelection) => void;
    setOverrides: (shipId: string, row: ShipRow, cost: number) => void;
    save: () => void;
    reset: () => void;
}

export const useFleetEditor = (args: IHookArguments): IHookResult => {
    const { initialFleetKey } = args;
    const navigate = useNavigate();
    const fleetSetups = useMemo<IFleetSetup[]>(() => getCurrentFleetSetups(), []);
    const [fleetSetup, setFleetSetup] = useState<IFleetSetup>(initialFleetKey ? fleetSetups.find(f => f.key === initialFleetKey) ?? fleetSetups[0] : fleetSetups[0]);

    const setShipCount = useCallback((shipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setFleetSetup(fleetSetup => applyShipCount({ shipId, count, reinforcement, fleetSetup }));
    }, []);

    const setCarriedShipCount = useCallback((shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => {
        setFleetSetup(fleetSetup => applyCarriedShipCount({ shipId, carrierShipId, count, reinforcement, fleetSetup }));
    }, []);

    const setModule = useCallback((shipId: string, reinforcement: ReinforcementType | null, moduleSelection: IModuleSelection) => {
        setFleetSetup(fleetSetup => applyModules({ shipId, reinforcement, moduleSelection, fleetSetup }));
    }, []);

    const setOverrides = useCallback((shipId: string, row: ShipRow, cost: number) => {
        setFleetSetup(fleetSetup => applyOverrides({ shipId, row, cost, fleetSetup }));
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
        setModule,
        setOverrides,
        save,
        reset,
    };
}
