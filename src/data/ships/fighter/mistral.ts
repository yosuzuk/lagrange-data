import { strategy, enhancements } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const mistral: IShipDefinition[] = [
    {
        id: ShipId.MISTRAL,
        name: 'ミストラル',
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
        modules: [
            modules.static({
                id: 'w1',
                name: '機載武器システム',
                translatedName: {
                    en: 'Airborne Weapon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.pursueTargets(20, 1, 40).withCost(13),
                    enhancements.customEnhancementWithKey('focusOnAerialTargets').withDescriptionKey('focusOnAerialTargets').withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 7,
                dpmShip: 59,
                dpmAntiAir: 571,
                dpmSiege: 0,
            }),
            modules.commandSystem({
                skillComplete: true,
                skills: [
                    enhancements.targetReset1().withCost(5),
                    enhancements.increaseSelfRepairEffectiveness().withPercentageValue(25).withCost(5),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.increaseHitRate().withPercentageValue(15).withCost(8),
                    enhancements.reduceFlightTime().withPercentageValue(40).withCost(10),
                ],
                skillSlots: 4,
            }),
        ],
        defaultStats: {
            hp: 5400,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 3,
            inboundTime: 3,
            dpmShip: 2212,
            dpmAntiAir: 3544,
            dpmSiege: 0,
        },
    },
];
