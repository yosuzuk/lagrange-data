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

export const sc002: IShipDefinition[] = [
    {
        id: ShipId.SC002,
        name: 'SC002型',
        translatedName: {
            en: 'SC002 - Generic Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.STRATEGY_AND_SUPPORT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: '1020101',
                name: '電子偵察システム',
                translatedName: {
                    en: 'Electronic Recon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: 'ダメージ回避',
                        translatedName: {
                            en: 'Dodge Damage',
                        },
                        description: '敵戦闘機に攻撃されると、攻撃を放棄して航空母艦に帰還する。効果は40秒続く。冷却時間20秒。',
                        translatedDescription: {
                            en: 'When attacked by enemy aircraft, it gives up its target and retreats to its carrier for 40s. Cooldown: 20s.',
                        },
                    }).withCost(14),
                    strategy.customStrategy({
                        name: '電子防御',
                        translatedName: {
                            en: 'Electronic Cover',
                        },
                        description: '自身、及び自身と同じ格納庫にある艦載機は、対空武器のロックオン効率の影響が15%ダウンする（同類効果の重ねがけは不可）',
                        translatedDescription: {
                            en: 'Reduces the effect Lock-On Efficiency of anti-aircraft weapons has on you and the aircraft within the same hangar by 15% (effects of the same type cannot stack)',
                        },
                    }).withCost(14),
                    enhancements.increaseJammingDuration().withPercentageValue(30).withCost(9),
                    enhancements.increaseJammingDuration().withPercentageValue(30).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(9),
                    enhancements.reduceHitByDirectFire().withPercentageValue(15).withCost(9),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: '1020102',
                name: '機載砲システム',
                translatedName: {
                    en: 'Airborne Cannon System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(2),
                ],
                skillSlots: 4,
            }),
            modules.commandSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseMaintenanceEfficiency().withPercentageValue(25).withCost(5),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.reduceHitByDirectFire().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceHitByMissile().withPercentageValue(15).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceFlightTime().withPercentageValue(40).withCost(12),
                ],
                skillSlots: 5,
            }),
        ],
        defaultStats: {
            hp: 2850,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 700,
            dpmAntiAir: 700,
            dpmSiege: 0,
        },
    },
];
