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

export const redBeast7_13: IShipDefinition[] = [
    {
        id: ShipId.RED_BEAST_7_13,
        name: 'RB7-13型',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.STRATEGY_AND_SUPPORT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: '攻撃ミサイルシステム',
                translatedName: {
                    en: 'Assault Missile System',
                },
                mainSystem: true,
                skills: [
                    strategy.heavyAmmo(60, 30).withCost(15),
                    // TODO cost
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.increaseHitRate().withPercentageValue(10),
                    enhancements.reduceCooldown().withPercentageValue(15),
                    enhancements.reduceCooldown().withPercentageValue(15),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50),
                    enhancements.increaseCriticalDamage().withPercentageValue(40),
                    enhancements.reduceMissileInterception().withPercentageValue(30),
                ],
                skillSlots: 6,
                dpmShip: 2640,
                dpmAntiAir: 580,
                dpmSiege: 184,
            }),
            modules.commandSystem(),
            modules.armorSystem({
                skills: [
                    // TODO cost
                    enhancements.increaseHp().withPercentageValue(10),
                    enhancements.increaseHp().withPercentageValue(10),
                    enhancements.increaseHp().withPercentageValue(10),
                    enhancements.increaseArmor().withAbsoluteValue(3),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skills: [
                    // TODO cost
                    enhancements.increaseEvasion().withPercentageValue(8),
                    enhancements.increaseEvasion().withPercentageValue(8),
                    enhancements.reduceLockOn().withPercentageValue(30),
                ],
                skillSlots: 2,
            }),
        ],
        defaultStats: {
            hp: 4750,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 2640,
            dpmAntiAir: 580,
            dpmSiege: 184,
        },
    },
];
