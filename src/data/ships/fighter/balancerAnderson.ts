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

export const balancerAnderson: IShipDefinition[] = [
    {
        id: ShipId.BALANCER_ANDERSON,
        name: 'バランサーアンダーソン',
        translatedName: {
            en: 'Balancer Anderson SC020 - Interference Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: '1140101',
                name: "機載干渉システム",
                translatedName: {
                    en: "Airborne Jamming System"
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseJammingDuration().withPercentageValue(30).withCost(9),
                    enhancements.increaseJammingDuration().withPercentageValue(30).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(9),
                    enhancements.reduceHitByDirectFire().withPercentageValue(15).withCost(9),
                    strategy.customStrategy({
                        name: "ダメージ回避",
                        translatedName: {
                            en: "Dodge Damage"
                        },
                        description: "敵戦闘機に攻撃されると、攻撃を放棄して航空母艦に帰還する。効果は40秒続く。冷却時間20秒。",
                        translatedDescription: {
                            en: "When attacked by enemy aircraft, it gives up its target and retreats to its carrier for 40s. Cooldown: 20s."
                        },
                    }).withCost(14),
                    enhancements.customEnhancement({
                        name: "電子防御",
                        translatedName: {
                            en: "Electronic Cover"
                        },
                        description: "自身、及び自身と同じ母艦に所属する艦載機は、対空武器のロックオン効率の影響が10%ダウンする（同類効果の重ねがけは不可）",
                        translatedDescription: {
                            en: "Reduces the effect Lock-On Efficiency of anti-aircraft weapons has on you and the aircraft within the same carrier by 10% (effects of the same type cannot stack)"
                        },
                    }).withCost(14),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: '1140102',
                name: "機載砲システム",
                translatedName: {
                    en: "Airborne Cannon System"
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
                    enhancements.reduceFlightTime().withPercentageValue(40).withCost(12),
                ],
                skillSlots: 4,
            }),
        ],
        defaultStats: {
            hp: 3450,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 1500,
            dpmAntiAir: 1440,
            dpmSiege: 0,
        },
    },
];
