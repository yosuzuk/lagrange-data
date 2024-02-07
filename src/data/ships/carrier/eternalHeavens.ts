import { enhancements, flagshipEffect } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipSubType, ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const defaultStats: IDefaultShipStats = {
    hp: 298690,
    armor: 105,
    shield: 15,
    speed: 350,
    warpSpeed: 1750,
    dpmShip: 18002,
    dpmAntiAir: 3130,
    dpmSiege: 4589,
};

export const eternalHeavens: IShipDefinition[] = [
    {
        id: ShipId.ETERNAL_HEAVENS,
        name: 'エターナルヘブン級',
        translatedName: {
            en: 'Eternal Heavens',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 2, // TODO verify
        row: ShipRow.BACK,
        operationLimit: 5,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        // researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        // researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        // researchTacticTypes: [],
        // relatedShipIds: [ShipId.ETERNAL_HEAVENS_TE],
        modules: [
            modules.static({
                id: 's1',
                name: '戦闘機連合作戦格納庫Ⅰ型',
                translatedName: {
                    en: 'Collaborative Hangar I',
                },
                mainSystem: true,
                carryFighter: 3,
                carryFighterType: ShipSubType.MEDIUM_FIGHTER,
                skillComplete: false,
                skills: [
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10),
                    enhancements.reduceRtbOfAircraft().withPercentageValue(40),
                    enhancements.reduceFlightTimeOfAircraft().withPercentageValue(40),
                    enhancements.reduceFlightTimeOfAircraft().withPercentageValue(20),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20),
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(50),
                    enhancements.customEnhancementWithKey('tacticsOfGuerillas').withDescriptionKey('tacticsOfGuerillas'),
                    // TODO adjust params
                    enhancements.customEnhancementWithKey('jointStrike').withDescriptionKey('jointStrike', { chance: 50, damage: 40 }),
                ],
                skillSlots: 5,
            }),
            modules.static({
                id: 's2',
                name: '複合砲システム',
                translatedName: {
                    en: 'Integrated Battery System',
                },
                skillComplete: false,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.reduceCooldown().withPercentageValue(15),
                    enhancements.reduceCooldown().withPercentageValue(15),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15),
                ],
                skillSlots: 4,
            }),
            modules.commandSystem({
                skillComplete: false,
                flagshipEffects: [
                    flagshipEffect.strategicStrike2(120).withDefaultFlag(),
                    // TODO cost
                    flagshipEffect.strategicStrike3(360, '15gm'),
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skills: [
                    // TODO cost
                    enhancements.customEnhancementWithKey('multiTargetAttack').withDescriptionKey('multiTargetAttack', { targetCount: 3 }),
                    enhancements.customEnhancementWithKey('auxiliaryAttackRadar').withDescriptionKey('auxiliaryAttackRadar', { hitrate: 8 }),
                    enhancements.customEnhancementWithKey('extraAmmoSupply').withDescriptionKey('extraAmmoSupply', { roundsPerCycle: 1, duration: 25 }),
                    enhancements.customEnhancementWithKey('rangeExtension').withDescriptionKey('rangeExtension', { radius: '10.0' }),
                    enhancements.increaseSystemHp().withPercentageValue(10),
                ],
                skillSlots: 3,
            }),
            modules.armorSystem({
                skillComplete: false,
                skills: [
                    // TODO cost
                    enhancements.increaseHp().withPercentageValue(10),
                    enhancements.increaseHp().withPercentageValue(10),
                    enhancements.increaseArmor().withAbsoluteValue(75),
                    enhancements.increaseArmor().withAbsoluteValue(75),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30),
                    enhancements.increaseShield().withPercentageValue(10),
                    enhancements.increaseRepairEffectivenessByArmor().withPercentageValue(0.05),
                ],
                skillSlots: 4,
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
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats,
    },
];
