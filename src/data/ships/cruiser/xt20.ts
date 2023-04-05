import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const xt20: IShipDefinition[] = [
    {
        id: ShipId.XT_20_A,
        name: 'XT-20級　Ａ積載型',
        translatedName: {
            en: 'XT-20 - Logistics Type',
        },
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 6,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryCorvette: 4,
        relatedShipIds: [ShipId.XT_20_B, ShipId.XT_20_C],
        defaultStats: {
            hp: 51120, // TODO check after update
            armor: 50,
            shield: 10,
            speed: 600,
            warpSpeed: 3000,
            dpmShip: 3240,
            dpmAntiAir: 0,
            dpmSiege: 97,
        },
    },
    {
        id: ShipId.XT_20_B,
        name: 'XT-20級　Ｂ艦載型',
        translatedName: {
            en: 'XT-20 - Aircraft Type',
        },
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 6,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryFighter: 4,
        carryFighterType: ShipSubType.LARGE_FIGHTER,
        relatedShipIds: [ShipId.XT_20_A, ShipId.XT_20_C],
        defaultStats: {
            hp: 51120, // TODO check after update
            armor: 50,
            shield: 10,
            speed: 600,
            warpSpeed: 3000,
            dpmShip: 4114,
            dpmAntiAir: 345,
            dpmSiege: 288,
        },
    },
    {
        id: ShipId.XT_20_C,
        name: 'XT-20級　Ｃ支援型',
        translatedName: {
            en: 'XT-20 - Support Type',
        },
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 6,
        source: ShipSource.UNKNOWN,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_20_B, ShipId.XT_20_C],
        defaultStats: {
            hp: 51120, // TODO check after update
            armor: 50,
            shield: 10,
            speed: 600,
            warpSpeed: 3000,
            dpmShip: 3240,
            dpmAntiAir: 3840,
            dpmSiege: 97,
        },
    },
];
