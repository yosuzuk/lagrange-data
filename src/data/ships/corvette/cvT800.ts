import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const cvT800: IShipDefinition[] = [
    {
        id: ShipId.CV_T800,
        name: 'CV-T800型',
        translatedName: {
            en: 'CV-T800 - Anti-Aircraft Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.STRATEGY_AND_SUPPORT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE
        ],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
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
                    strategy.rapidFire(80, 60, 15, 10).withCost(18),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(12),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(12),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(12),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(12),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(12),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(12),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(12),
                ],
                skillSlots: 6,
                dpmShip: 2400,
                dpmAntiAir: 1920,
                dpmSiege: 48,
            }),
            modules.commandSystem({
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
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
        defaultStats: {
            hp: 7500,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 2400,
            dpmAntiAir: 1920,
            dpmSiege: 48,
        },
    },
];
