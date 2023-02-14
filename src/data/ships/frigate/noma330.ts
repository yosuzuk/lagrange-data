import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const noma330: IShipDefinition[] = [
    {
        id: ShipId.NOMA_330_A,
        name: 'ノマ330　Ａ高速型',
        type: ShipType.FRIGATE,
        cost: 3,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.NOMA_330_TE_A],
    },
    {
        id: ShipId.NOMA_330_TE_A,
        name: 'ノマ330-TE　Ａ高速型',
        type: ShipType.FRIGATE,
        cost: 3,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.NOMA_330_A],
    },
];
