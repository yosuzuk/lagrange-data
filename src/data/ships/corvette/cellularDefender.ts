import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IDefaultShipStats, IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const defaultStats: IDefaultShipStats = {
    hp: 6650,
    armor: 2,
    shield: 0,
    speed: 2500,
    warpSpeed: 12500,
    dpmShip: 4740,
    dpmAntiAir: 1159,
    dpmSiege: 1656,
};

export const cellularDefender: IShipDefinition[] = [
    {
        id: ShipId.CELLULAR_DEFENDER,
        name: 'セルラーディフェンダー',
        translatedName: {
            en: 'Cellular Defender - Multi-Role Type',
        },
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
                name: "魚雷攻撃システム",
                translatedName: {
                    en: 'Torpedo Attack System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(7),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(7),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(7),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(7),
                ],
                skillSlots: 6,
                parts: [
                    {
                        text: [
                            'CT-4-4500型　「ビーハイヴ」',
                            '対大型：',
                            '・投射、実弾、対艦：4080、攻城：1469',
                        ],
                    },
                ],
                dpmShip: 4080,
                dpmAntiAir: 0,
                dpmSiege: 1469,
            }),
            modules.static({
                id: "w2",
                name: "速射砲システム",
                translatedName: {
                    en: 'Rapid-Fire Battery System',
                },
                skillComplete: true,
                skills: [
                    strategy.antiAircraftMeasures(80, 15, 30).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(7),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(7),
                ],
                skillSlots: 5,
                parts: [
                    {
                        text: [
                            'CG-11320型　速射砲',
                            '対小型：',
                            '・直射、実弾、対艦：660、対空：187、攻城：187',
                            '反撃対空',
                        ],
                    },
                    {
                        text: [
                            'MK1-CG-628B/D型　近接防御砲',
                            '対空：',
                            '・直射、実弾、対空：691',
                            '反撃対空',
                            '特殊弾薬：対空ダメージ+5'
                        ],
                    },
                ],
                dpmShip: 660,
                dpmAntiAir: 1159,
                dpmSiege: 187,
            }),
            modules.static({
                id: "sp1",
                name: "状況把握システム",
                translatedName: {
                    en: 'Situational Awareness System',
                },
                effects: [
                    enhancements.reduceHitByMissile().withFixedPercentageValue(30),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.commandSystem({
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(5),
                    enhancements.increaseHp().withPercentageValue(12).withCost(5),
                    enhancements.increaseHp().withPercentageValue(12).withCost(5),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(5),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                ],
                skillSlots: 2,
            }),
        ],
        defaultStats,
    },
];
