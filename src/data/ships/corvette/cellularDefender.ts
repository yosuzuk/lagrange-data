import { enhancements } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const cellularDefender: IShipDefinition[] = [
    {
        id: ShipId.CELLULAR_DEFENDER,
        name: 'セルラーディフェンダー',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: "w1",
                name: "Torpedo Attack System",
            }),
            modules.static({
                id: "w2",
                name: "Rapid-Fire Battery System",
            }),
            modules.static({
                id: "sp2",
                name: "Situational Awareness System",
            }),
            modules.commandSystem(),
            modules.armorSystem(),
            modules.propulsionSystem({
                parts: [
                    {
                        skills: [
                            enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                            enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                            enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                        ],
                        skillSlots: 2,
                    },
                ],
            }),
        ],
    },
];
