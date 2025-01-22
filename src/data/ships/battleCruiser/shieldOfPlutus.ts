import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '総合武器システム',
    translatedName: {
        en: 'Integrated Weapon System',
    },
    description: '対小型艦武装',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    skillComplete: false,
    skills: [
        // TODO cost
        strategy.rapidFire(80, 60, 15, 10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.increaseSystemHp().withPercentageValue(35),
    ],
    skillSlots: 6,
    dpmShip: 15108,
    dpmAntiAir: 384,
    dpmSiege: 1851,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '「フォートレス」護衛システム',
    translatedName: {
        en: '"Fortress" Defense System',
    },
    description: '対小型UAV',
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    skillComplete: false,
    skills: [
        // TODO cost
        strategy.customStrategy({
            name: '逆境ガーディアン',
            translatedName: {
                en: 'Adversity Guardian',
            },
            description: '戦闘中、味方艦隊に前列ユニットがいないとき、艦船位置が前列となる。',
            translatedDescription: {
                en: 'While in combat, change ship position to the front row of your formation when your fleet lacks front-row units.',
            },
        }),
        enhancements.reduceFlightTimeAndWeaponCooldownOfAircraft().withPercentageValue(20),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20),
    ],
    skillSlots: 4,
    dpmShip: 4800,
    dpmAntiAir: 0,
    dpmSiege: 0,
};

export const shieldOfPlutus: IShipDefinition[] = [
    {
        id: ShipId.SHIELD_OF_PLUTUS,
        name: 'ブルートスの盾級',
        translatedName: {
            en: 'Shield of Plutus',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 2, // TODO verify
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        // researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        // researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        // researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            m1,
            // m2,
            // m3,
            a1,
            // a2,
            // a3,
            // b1,
            // b2,
            // b3,
            // c1,
            // c2,
            // c3,
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.customFlashipEffect({
                        name: '庇護作戦',
                        translatedName: {
                            en: 'Sanctuary',
                        },
                        // TODO max value (30% ?)
                        description: '艦隊が同時に複数の艦隊から攻撃を受ける場合、作戦メイン目標以外の3つの艦隊からのダメージが10%ダウンする。',
                        translatedDescription: {
                            en: 'When the fleet is attacked by multiple fleets simultaneously, reduce the damage received from 3 fleets other than the primary combat target by 10%.',
                        },
                    }),
                    // TODO
                ],
                skillComplete: false,
                skills: [
                    // TODO cost
                    enhancements.reduceDamageReceivedBySystem().withAbsoluteValue(5),
                    enhancements.increaseSystemHp().withPercentageValue(10),
                ],
                skillSlots: 2,
            }),
            modules.armorSystem({
                skillComplete: false,
                skills: [
                    // TODO cost
                    enhancements.increaseHp().withPercentageValue(10),
                    enhancements.increaseHp().withPercentageValue(10),
                    enhancements.increaseArmor().withAbsoluteValue(75),
                    enhancements.increaseArmor().withAbsoluteValue(75),
                    enhancements.increaseShield().withPercentageValue(10),
                    enhancements.increaseShield().withPercentageValue(10),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25),
                    enhancements.increaseRepairEffectivenessByArmor().withPercentageValue(0.05),
                ],
                skillSlots: 6,
            }),
            modules.propulsionSystem({
                skillComplete: false,
                skills: [
                    // TODO cost
                    enhancements.increaseCruisingSpeed().withPercentageValue(15),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15),
                    enhancements.increaseWarpSpeed().withPercentageValue(15),
                    enhancements.increaseWarpSpeed().withPercentageValue(15),
                ],
                skillSlots: 3,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 185720,
            armor: 240,
            shield: 5,
            speed: 250,
            warpSpeed: 1250,
            dpmShip: 19908,
            dpmAntiAir: 384,
            dpmSiege: 1851,
        },
    },
];
