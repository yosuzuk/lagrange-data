import { ShipSubType, ShipType } from '../../../../types/ShipType';
import { IShipSelection } from '../types/IFleetSetup';

export interface IHangar {
    corvette: IHangarInstance;
    upToLargeFighter: IHangarInstance;
    upToMediumFighter: IHangarInstance;
    upToSmallFighter: IHangarInstance;
    removedHangar: IHangarInstance; // use when ships are carried but hangar is not available anymore (removed system module)
}

export interface IHangarInstance {
    key: string;
    name: string;
    count: number;
    maxCount: number;
}

export function getHangar(shipSelection: IShipSelection): IHangar {
    const result: IHangar = {
        corvette: {
            key: 'corvette',
            name: '護送艦',
            count: shipSelection.carriedShips
                .filter(s => s.shipDefinition.type === ShipType.CORVETTE)
                .map(s => s.count)
                .reduce((sum, count) => sum + count, 0),
            maxCount: shipSelection.carrierCapabilities.carryCorvette * shipSelection.count,
        },
        upToLargeFighter: {
            key: 'upToLargeFighter',
            name: '小～大型戦闘機',
            count: shipSelection.carriedShips
                .filter(s => s.shipDefinition.type === ShipType.FIGHTER && s.shipDefinition.subType === ShipSubType.LARGE_FIGHTER)
                .map(s => s.count)
                .reduce((sum, count) => sum + count, 0),
            maxCount: shipSelection.carrierCapabilities.carryUpToLargeFighter * shipSelection.count,
        },
        upToMediumFighter: {
            key: 'upToMediumFighter',
            name: '小～中量級戦闘機',
            count: shipSelection.carriedShips
            .filter(s => s.shipDefinition.type === ShipType.FIGHTER && s.shipDefinition.subType === ShipSubType.MEDIUM_FIGHTER)
                .map(s => s.count)
                .reduce((sum, count) => sum + count, 0),
            maxCount: shipSelection.carrierCapabilities.carryUpToMediumFighter * shipSelection.count,
        },
        upToSmallFighter: {
            key: 'upToSmallFighter',
            name: '小型戦闘機',
            count: shipSelection.carriedShips
            .filter(s => s.shipDefinition.type === ShipType.FIGHTER && s.shipDefinition.subType === ShipSubType.SMALL_FIGHTER)
                .map(s => s.count)
                .reduce((sum, count) => sum + count, 0),
            maxCount: shipSelection.carrierCapabilities.carryUpToSmallFighter * shipSelection.count,
        },
        removedHangar: {
            key: 'removedHangar',
            name: '未対応',
            count: 0,
            maxCount: 0,
        },
    };

    moveOverflowToNextHangar(result.upToSmallFighter, [result.upToMediumFighter, result.upToLargeFighter]);
    moveOverflowToNextHangar(result.upToMediumFighter, [result.upToLargeFighter]);

    if (result.upToSmallFighter.maxCount === 0) {
        moveOverflowToNextHangar(result.upToSmallFighter, [result.removedHangar]);
    }

    if (result.upToMediumFighter.maxCount === 0) {
        moveOverflowToNextHangar(result.upToMediumFighter, [result.removedHangar]);
    }

    if (result.upToLargeFighter.maxCount === 0) {
        moveOverflowToNextHangar(result.upToLargeFighter, [result.removedHangar]);
    }

    return result;
}

function moveOverflowToNextHangar(source: IHangarInstance, targets: IHangarInstance[]) {
    let overflow = source.count - source.maxCount;
    if (overflow <= 0) {
        return;
    }

    source.count -= overflow;

    targets.forEach(target => {
        if (overflow <= 0 || target.maxCount === 0) {
            return;
        }
        const remainingSpace = target.maxCount - target.count;
        if (remainingSpace <= 0) {
            return;
        }
        const moving = Math.min(remainingSpace, overflow);
        overflow -= moving;
        target.count += moving;
    });

    if (overflow > 0) {
        source.count += overflow;
    }
}

export function shouldVisualizeHangar(hangar: IHangarInstance): boolean {
    return hangar.count > 0 || hangar.maxCount > 0;
}
