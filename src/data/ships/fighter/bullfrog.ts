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

export const bullfrog: IShipDefinition[] = [
    {
        id: ShipId.BULLFROG,
        name: 'ブルフロッグ型',
        translatedName: {
            en: 'Balancer Anderson SC020 - Interference Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.LARGE_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: '1080101',
                name: '機載爆弾投下システム',
                translatedName: {
                    en: 'Airborne Bombardment System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '高密度弾幕',
                        translatedName: {
                            en: 'Concentrated Attacks',
                        },
                        description: '30秒ごとに超主力艦を優先攻撃する。攻撃回数2回増加、攻撃持続時間30%アップ、攻撃冷却時間30%アップ。効果は40秒続く。',
                        translatedDescription: {
                            en: 'Prioritizes attacks on super capital ships, increases Attacks Per Round by 2, Attack Duration by 30%, and Cooldown by 30% every 30s for 40s.',
                        },
                    }).withCost(15),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 7,
            }),
            modules.commandSystem({
                skillComplete: true,
                skills: [
                    enhancements.targetReset2().withCost(5),
                    enhancements.increaseMaintenanceEfficiency().withPercentageValue(25).withCost(5),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(3).withCost(5),
                    enhancements.increaseArmor().withAbsoluteValue(3).withCost(5),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(7),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(7),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(7),
                    enhancements.reduceFlightTime().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 3,
            }),
        ],
        defaultStats: {
            hp: 4740,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 1920,
            dpmAntiAir: 0,
            dpmSiege: 880,
        },
    },
];
