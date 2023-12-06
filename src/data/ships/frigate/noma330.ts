import { enhancements, flagshipEffect } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const staticModules = [
    modules.static({
        id: '3060101',
        name: '速射砲システム',
        translatedName: {
            en: 'Rapid-Fire Battery System',
        },
        mainSystem: true,
        skillComplete: true,
        skills: [
            enhancements.increaseDamage().withPercentageValue(10).withCost(15),
            enhancements.increaseDamage().withPercentageValue(10).withCost(15),
            enhancements.reduceCooldown().withPercentageValue(15).withCost(15),
            enhancements.reduceCooldown().withPercentageValue(15).withCost(15),
            enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(15),
            enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(15),
        ],
        skillSlots: 4,
    }),
    modules.commandSystem({
        skillComplete: true,
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
        ],
        skills: [],
        skillSlots: 0,
    }),
    modules.armorSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseHp().withPercentageValue(12).withCost(10),
            enhancements.increaseHp().withPercentageValue(12).withCost(10),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(3).withCost(8),
        ],
        skillSlots: 3,
    }),
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
        ],
        skillSlots: 3,
    }),
    modules.energySystem({
        skillComplete: true,
        skills: [],
        skillSlots: 0,
    }),
];

export const noma330: IShipDefinition[] = [
    {
        id: ShipId.NOMA_330_A,
        name: 'ノマ330　Ａ高速型',
        translatedName: {
            en: 'NOMA 330 - Standard Type',
        },
        type: ShipType.FRIGATE,
        cost: 3,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.NOMA_330_TE_A],
        modules: staticModules,
        defaultStats: {
            hp: 12180,
            armor: 5,
            shield: 0,
            speed: 1040,
            warpSpeed: 5200,
            dpmShip: 900,
            dpmAntiAir: 161,
            dpmSiege: 229,
        },
    },
    {
        id: ShipId.NOMA_330_TE_A,
        name: 'ノマ330-TE　Ａ高速型',
        translatedName: {
            en: 'NOMA 330 (TE) - High-Speed Type',
        },
        type: ShipType.FRIGATE,
        cost: 3,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.NOMA_330_A],
        modules: staticModules,
        defaultStats: {
            hp: 12180,
            armor: 5,
            shield: 0,
            speed: 1040,
            warpSpeed: 5200,
            dpmShip: 900,
            dpmAntiAir: 161,
            dpmSiege: 229,
        },
    },
];
