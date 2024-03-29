import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const helios: IShipDefinition[] = [
    {
        id: ShipId.HELIOS_A,
        name: 'ヘリオス級　Ａ一般型',
        translatedName: {
            en: 'Helios - Generic Type',
        },
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_TE_A, ShipId.HELIOS_TE_A_S, ShipId.HELIOS_TE_B_S],
        defaultStats: {
            hp: 44310,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 9135,
            dpmAntiAir: 278,
            dpmSiege: 1023,
        },
    },
    {
        id: ShipId.HELIOS_TE_A,
        name: 'ヘリオス級-TE　Ａ一般型',
        translatedName: {
            en: 'Helios (TE) - Generic Type',
        },
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_A, ShipId.HELIOS_TE_A_S, ShipId.HELIOS_TE_B_S],
        defaultStats: {
            hp: 44310,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 9135,
            dpmAntiAir: 278,
            dpmSiege: 1023,
        },
    },
    {
        id: ShipId.HELIOS_TE_A_S,
        name: 'ヘリオス級-TE　Ａ一般型（回収）',
        translatedName: {
            en: 'Helios (TE) - Generic Type (salvaged)',
        },
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_A, ShipId.HELIOS_TE_A, ShipId.HELIOS_TE_B_S],
        defaultStats: {
            hp: 40560,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 11643,
            dpmAntiAir: 167,
            dpmSiege: 1023,
        },
    },
    {
        id: ShipId.HELIOS_TE_B_S,
        name: 'ヘリオス級-TE　Ｂ魚雷型（回収）',
        translatedName: {
            en: 'Helios (TE) - Torpedo Type (salvaged)',
        },
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_A, ShipId.HELIOS_TE_A, ShipId.HELIOS_TE_A_S],
        defaultStats: {
            hp: 44310,
            armor: 20,
            shield: 20,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 8163,
            dpmAntiAir: 0,
            dpmSiege: 1986,
        },
    },
];
