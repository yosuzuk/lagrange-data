import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
// import { ResearchTacticType } from '../../../types/ResearchTacticType';
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
        skillComplete: false,
        skills: [
            // TODO cost
            enhancements.increaseHp().withPercentageValue(12),
            enhancements.increaseHp().withPercentageValue(12),
            enhancements.increaseHp().withPercentageValue(12),
            enhancements.increaseEnemyLockOn().withPercentageValue(40),
        ],
        skillSlots: 3,
    }),
];

export const haleBopp: IShipDefinition[] = [
    {
        id: ShipId.HALE_BOPP_A,
        name: 'ヘールボップ　Ａ多機能型',
        translatedName: {
            en: 'Hale-Bopp - Multi-Role Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [],
        subModelIds: [ShipId.HALE_BOPP_B],
        modules: [
            modules.static({
                id: 'm1',
                name: '緊急補修システム',
                translatedName: {
                    en: 'Emergency Maintenance System',
                },
                mainSystem: true,
                skillComplete: false,
                skills: [
                    // TODO cost
                    strategy.customStrategy({
                        name: '制御アルゴリズムの最適化',
                        translatedName: {
                            en: 'Control Algorithm Optimization',
                        },
                        description: '目標艦船を補修する際、毎10秒に10%の確率で目標の機能不全のメイン武器システムを修復し、一回作業させます。複数の護送艦が補修を行う場合、効果は独立して判定され、互いに影響しません。',
                        translatedDescription: {
                            en: 'When repairing the target ship, there is a 10 seconds interval with a 10% + 25% chance to repair the target\'s disabled primary weapon system, allowing it to function for one cycle. When multiple corvettes perform repairs, the effects are independently determined and do not affect each other.',
                        },
                    }).withDefaultFlag(),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10),
                    enhancements.reduceLockOn().withPercentageValue(30),
                    enhancements.reduceLockOn().withPercentageValue(30),
                    enhancements.reduceCooldown().withPercentageValue(15),
                    enhancements.reduceCooldown().withPercentageValue(15),
                ],
                skillSlots: 4,
            }),
            ...staticModules,
            modules.propulsionSystem({
                skillComplete: false,
                skills: [
                    // TODO cost
                    strategy.customStrategyWithKey('activeManeuvers').withDescriptionKey('activeManeuvers'),
                    enhancements.increaseEvasion().withPercentageValue(8),
                    enhancements.increaseEvasion().withPercentageValue(8),
                    enhancements.reduceDuration().withPercentageValue(20),
                    enhancements.reduceLockOn().withPercentageValue(30),
                ],
                skillSlots: 2,
            }),
        ],
        defaultStats: {
            hp: 7000,
            armor: 2,
            shield: 0,
            speed: 2400,
            warpSpeed: 12500,
            dpmShip: 0,
            dpmAntiAir: 0,
            dpmSiege: 0,
        },
    },
    {
        id: ShipId.HALE_BOPP_B,
        name: 'ヘールボップ　Ｂ結合型',
        translatedName: {
            en: 'Hale-Bopp - Dock Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [],
        baseModelId: ShipId.HALE_BOPP_A,
        modules: [
            modules.static({
                id: 'm1',
                name: '「オーバークロック」補修システム',
                translatedName: {
                    en: '"Overclock" Maintenance System',
                },
                mainSystem: true,
                skillComplete: false,
                skills: [
                    // TODO cost
                    strategy.customStrategy({
                        name: '結合アルゴリズムの最適化',
                        translatedName: {
                            en: 'Dock Algorithm Optimization',
                        },
                        description: '目標艦船を補修する際、補修モジュールは毎ラウンド作業時に10%の確率で補修目標に自己補修効果を付与します。この効果は独立して動作し、補修護送艦の作業状態には影響されません。自己補修：5秒ごとに独自の50構造値を補修し、45秒続きます。同時に10レイヤーがあります。',
                        translatedDescription: {
                            en: 'When repairing the target ship, the repair module has a 10% chance to apply the Self-Repair effect to the repair target each cycle. This effect operates independently and is not influenced by the working status of the repair corvette. Self-Repair: Restores 50 HP to itself every 5s for 45 second(s). This effect can stack up to 10 time(s).',
                        },
                    }).withDefaultFlag(),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10),
                    enhancements.reduceLockOn().withPercentageValue(30),
                    enhancements.reduceLockOn().withPercentageValue(30),
                    enhancements.reduceCooldown().withPercentageValue(15),
                    enhancements.reduceCooldown().withPercentageValue(15),
                ],
                skillSlots: 4,
            }),
            ...staticModules,
            modules.propulsionSystem({
                skillComplete: false,
                skills: [
                    // TODO cost
                    strategy.customStrategy({
                        name: "ダメージ回避",
                        translatedName: {
                            en: "Dodge Damage"
                        },
                        description: "敵戦闘機に攻撃されると、攻撃を放棄して航空母艦に帰還する。効果は40秒続く。冷却時間20秒。",
                        translatedDescription: {
                            en: "When attacked by enemy aircraft, it gives up its target and retreats to its carrier for 40s. Cooldown: 20s."
                        },
                    }),
                    enhancements.increaseEvasion().withPercentageValue(8),
                    enhancements.increaseEvasion().withPercentageValue(8),
                    enhancements.reduceDuration().withPercentageValue(20),
                    enhancements.reduceLockOn().withPercentageValue(30),
                ],
                skillSlots: 2,
            }),
        ],
        defaultStats: {
            hp: 7000,
            armor: 2,
            shield: 0,
            speed: 2400,
            warpSpeed: 12500,
            dpmShip: 0,
            dpmAntiAir: 0,
            dpmSiege: 0,
        },
    },
];
