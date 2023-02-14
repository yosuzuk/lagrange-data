import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const boreas: IShipDefinition[] = [
    {
        id: ShipId.BOREAS_A,
        name: 'ボレアス級　Ａ一般型',
        type: ShipType.DESTROYER,
        cost: 10,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.BOREAS_B, ShipId.BOREAS_TE_B_S],
    },
    {
        id: ShipId.BOREAS_B,
        name: 'ボレアス級　Ｂミサイル型',
        type: ShipType.DESTROYER,
        cost: 10,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.BOREAS_A, ShipId.BOREAS_TE_B_S],
    },
    {
        id: ShipId.BOREAS_TE_B_S,
        name: 'ボレアス級-TE　Ａミサイル型（回収）',
        type: ShipType.DESTROYER,
        cost: 10,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.BOREAS_A, ShipId.BOREAS_B],
    },
];
