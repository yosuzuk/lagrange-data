import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const staticModules: ISystemModule[] = [
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
];

export const nebulaChaser: IShipDefinition[] = [
    {
        id: ShipId.NEBULA_CHASER_A,
        name: 'ネビュラチェイサー　Ａ弾道型',
        translatedName: {
            en: 'Nebula Chaser - Ballistic Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.NEBULA_CHASER_B],
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
                    strategy.prioritizeTargets().withCost(12),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                ],
                skillSlots: 6,
                parts: [
                    {
                        text: [
                            'CG-2880型　2連速射砲',
                            '対小型：',
                            '・直射、実弾、対艦：1920、対空：115、攻城：336',
                            '反撃対空',
                            '軽量弾薬：対空ダメージ45ダウン',
                        ],
                    },
                ],
            }),
            modules.static({
                id: 'w2',
                name: '攻撃ミサイルシステム',
                translatedName: {
                    en: 'Assault Missile System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 3,
                parts: [
                    {
                        text: [
                            'CM-4x1200型　ロケット発射塔',
                            '対小型：',
                            '・投射、実弾、対艦：480、対空：432、攻城：252',
                            '反撃対空',
                        ],
                    },
                ],
                dpmShip: 480,
                dpmAntiAir: 432,
                dpmSiege: 252,
            }),
            modules.static({
                id: 'sp1',
                name: '通信増強システム',
                translatedName: {
                    en: 'Information Enhancement System',
                },
                effects: [
                    enhancements.increaseHitRate().withFixedPercentageValue(30),
                ],
                skillComplete: true,
                skills: [
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(20).withCost(8),
                    enhancements.reduceHitByDirectFire().withPercentageValue(14.8).withCost(8),
                ],
                skillSlots: 2,
            }),
            ...staticModules,
        ],
        defaultStats: {
            hp: 6300,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 2400,
            dpmAntiAir: 547,
            dpmSiege: 588,
        },
    },
    {
        id: ShipId.NEBULA_CHASER_B,
        name: 'ネビュラチェイサー　Ｂパルス型',
        translatedName: {
            en: 'Nebula Chaser - Pulse Cannon Type',
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
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.NEBULA_CHASER_A,
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
                    strategy.rapidFire(80, 60, 15, 10).withCost(13),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(9),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(9),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                ],
                skillSlots: 6,
                parts: [
                    {
                        text: [
                            'CP-170T/D　「アイオブプトレマイオス」',
                            '対小型：',
                            '・直射、エネルギー、対艦：3680、対空：2208、攻城：73',
                            '反撃対空',
                        ],
                    },
                ],
            }),
            modules.static({
                id: 'sp1',
                name: '通信増強システム',
                translatedName: {
                    en: 'Information Enhancement System',
                },
                effects: [
                    enhancements.increaseHitRate().withFixedPercentageValue(30),
                ],
                skillComplete: true,
                skills: [
                    enhancements.reduceHitByDirectFire().withPercentageValue(15).withCost(10),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(20).withCost(10),
                    enhancements.reduceHitBySlow().withPercentageValue(25).withCost(10),
                ],
                skillSlots: 2,
            }),
            modules.static({
                id: 'sp2',
                name: 'パルスエネルギー貯蔵システム',
                translatedName: {
                    en: 'Pulse Energy Storage System',
                },
                effects: [
                    enhancements.increaseDamage().withFixedPercentageValue(15),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            ...staticModules,
        ],
        defaultStats: {
            hp: 5400,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 3680,
            dpmAntiAir: 2208,
            dpmSiege: 73,
        },
    },
];
