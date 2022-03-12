import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../../userSettings/utils/userSettingsUtils';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { applyCarriedShipCount, applyShipCount, createFleetSetup, getCurrentFleetSetups, saveFleetSetup } from '../utils/fleetSetupUtils';

interface IHookResult {
    fleetSetup: IFleetSetup;
    errors: Record<string, string>;
    setFleetSetup: (fleetSetup: IFleetSetup) => void;
    setShipCount: (shipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    setCarriedShipCount: (shipId: string, carrierShipId: string, count: number, reinforcement: ReinforcementType | null) => void;
    save: () => void;
    reset: () => void;
}

export const useFleetEditor = (initialFleetKey?: string): IHookResult => {
    const navigate = useNavigate();
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
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

    const errors = useMemo(() => {
        const errorMap: Record<string, string> = {};
        if (fleetSetup.name.length === 0) {
            errorMap['name'] = '必須項目';
        }
        if (!Number.isFinite(fleetSetup.maxReinforcement) || fleetSetup.maxReinforcement < 0) {
            errorMap['maxReinforcement'] = '無効な値';
        }
        if (!Number.isFinite(fleetSetup.maxCost) || fleetSetup.maxCost < 300 || fleetSetup.maxCost > 450) {
            errorMap['maxCost'] = '無効な値';
        }
        if (fleetSetup.maxCost > 400 && fleetSetup.maxReinforcement > 5) {
            errorMap['maxReinforcement'] = errorMap['maxReinforcement'] ?? '基地結合効果は１つまでです';
            errorMap['maxCost'] = errorMap['maxCost'] ?? '基地結合効果は１つまでです';
        }
        return errorMap;
    }, [fleetSetup]);

    return {
        fleetSetup,
        errors,
        setFleetSetup,
        setShipCount,
        setCarriedShipCount,
        save,
        reset,
    };
}
