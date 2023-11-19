import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const stingray: IShipDefinition[] = [
    {
        id: ShipId.STINGRAY,
        name: 'スティングレイ',
        type: ShipType.FIGHTER,
        subType: ShipSubType.LARGE_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: '機載爆薬投下システム',
                translatedName: {
                    en: 'Airborne Bombardment System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('stealthAttacks').withDescriptionKey('stealthAttacks', { evasion: 90, hitrate: 30, interval: 90, duraction: 30 }) .withCost(14),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10, 10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50, 30).withCost(10),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 7,
                dpmShip: 1560,
                dpmAntiAir: 0,
                dpmSiege: 496,
            }),
            modules.commandSystem({
                skillComplete: true,
                skills: [
                    enhancements.targetReset2().withCost(5),
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
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.reduceLockOnEfficiencyChance().withPercentageValue(20).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.reduceFlightTime().withPercentageValue(30).withCost(12),
                ],
                skillSlots: 3,
            }),
        ],
        defaultStats: {
            hp: 5200,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 8,
            inboundTime: 4,
            dpmShip: 3200,
            dpmAntiAir: 0,
            dpmSiege: 992,
        },
    },
];
