import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const xt8: IShipDefinition[] = [
    {
        id: ShipId.XT_8_A,
        name: 'XT-8級　Ａ攻城型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_8_B],
    },
    {
        id: ShipId.XT_8_B,
        name: 'XT-8級　Ｂミサイル型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_8_A],
    },
];
