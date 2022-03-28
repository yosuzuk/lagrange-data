import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';

export function validateFleetSetupForPropertyErrors(fleetSetup: IFleetSetup): Record<string, string> {
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
}

interface ICountAndLimitForShip {
    count: number;
    reinforcementCount: number;
    operationLimit: number;
}

interface ICountAndLimitForCarriedShip {
    count: number;
    operationLimit: number;
}

export function validateFleetSetupForShipWarnings(fleetSetup: IFleetSetup): Record<string, string> {
    const errorMap: Record<string, string> = {};
    const shipCountMap: Record<string, ICountAndLimitForShip> = {};
    const carriedShipCountMap: Record<string, ICountAndLimitForCarriedShip> = {};

    fleetSetup.ships.filter(ship => ship.reinforcement !== 'ally').forEach(ship => {
        const key = ship.shipDefinition.id;
        if (!!shipCountMap[key]) {
            const entry = shipCountMap[key];
            shipCountMap[key] = {
                count: ship.reinforcement === null ? ship.count : entry.count,
                reinforcementCount: ship.reinforcement !== null ? ship.count : entry.reinforcementCount,
                operationLimit: ship.shipDefinition.operationLimit,
            };
        } else {
            shipCountMap[key] = {
                count: ship.reinforcement === null ? ship.count : 0,
                reinforcementCount: ship.reinforcement !== null ? ship.count : 0,
                operationLimit: ship.shipDefinition.operationLimit,
            };
        }

        ship.carriedShips.forEach(carriedShip => {
            const carriedShipKey = carriedShip.shipDefinition.id;
            if (!carriedShipCountMap[carriedShipKey]) {
                carriedShipCountMap[carriedShipKey] = {
                    count: carriedShip.count,
                    operationLimit: carriedShip.shipDefinition.operationLimit,
                };
            } else {
                carriedShipCountMap[carriedShipKey].count += carriedShip.count;
            }
        });
    });

    Object.keys(shipCountMap).forEach(shipId => {
        const entry = shipCountMap[shipId];
        if ((entry.count + entry.reinforcementCount) > entry.operationLimit) {
            errorMap[shipId] = '配備した合計数が稼働上限を超えています。';
        }
    });

    Object.keys(carriedShipCountMap).forEach(carriedShipId => {
        const entry = carriedShipCountMap[carriedShipId];
        if (entry.count > entry.operationLimit) {
            errorMap[carriedShipId] = '配備した合計数が稼働上限を超えています。';
        }
    });

    return errorMap;
}
