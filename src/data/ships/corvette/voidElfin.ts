import { enhancements, strategy } from '../../../enhancements/enhancements';
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

export const voidElfin: IShipDefinition[] = [
    {
        id: ShipId.VOID_ELFIN,
        name: 'ボイドエルフィン',
        translatedName: {
            en: 'Void Elfin - Offensive Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: '「ストーム」MK0.1ミサイルシステム',
                translatedName: {
                    en: '"Storm" MK0.1 Missile System',
                },
                mainSystem: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(9),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(9),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(9),
                    enhancements.reduceMissileInterception().withPercentageValue(30).withCost(9),
                ],
                skillSlots: 6,
                dpmShip: 2933,
                dpmAntiAir: 0,
                dpmSiege: 128,
            }),
            modules.static({
                id: 'w2',
                name: '速射砲システム',
                translatedName: {
                    en: 'Rapid-Fire Battery System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
                ],
                skillSlots: 4,
                dpmShip: 660,
                dpmAntiAir: 468,
                dpmSiege: 187,
            }),
            modules.static({
                id: 'sp1',
                name: '通信干渉システム',
                translatedName: {
                    en: 'Information Jamming System',
                },
                effects: [
                    enhancements.increaseEvasion().withFixedPercentageValue(35),
                ],
                skills: [
                    strategy.activeInterference(90, 75, 20).withCost(14),
                    enhancements.reduceHitByMissile().withPercentageValue(20).withCost(10),
                    enhancements.reduceHitByDirectFire().withPercentageValue(15).withCost(10),
                ],
                skillSlots: 2,
            }),
            modules.commandSystem(),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(5),
                    enhancements.increaseHp().withPercentageValue(12).withCost(5),
                    enhancements.increaseHp().withPercentageValue(12).withCost(5),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(5),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                ],
                skillSlots: 2,
            }),
        ],
        defaultStats: {
            hp: 5200,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 3593,
            dpmAntiAir: 468,
            dpmSiege: 315,
        },
    },
];
