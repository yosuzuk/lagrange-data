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
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_TE_A, ShipId.HELIOS_TE_A_S, ShipId.HELIOS_TE_B_S],
    },
    {
        id: ShipId.HELIOS_TE_A,
        name: 'ヘリオス級-TE　Ａ一般型',
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_A, ShipId.HELIOS_TE_A_S, ShipId.HELIOS_TE_B_S],
    },
    {
        id: ShipId.HELIOS_TE_A_S,
        name: 'ヘリオス級-TE　Ａ一般型（回収）',
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_A, ShipId.HELIOS_TE_A, ShipId.HELIOS_TE_B_S],
    },
    {
        id: ShipId.HELIOS_TE_B_S,
        name: 'ヘリオス級-TE　Ｂ魚雷型（回収）',
        type: ShipType.DESTROYER,
        cost: 15,
        weight: 0,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.HELIOS_A, ShipId.HELIOS_TE_A, ShipId.HELIOS_TE_A_S],
    },
];
