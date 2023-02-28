import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const xt10: IShipDefinition[] = [
    {
        id: ShipId.XT_10_A,
        name: 'XT-10級　Ａ魚雷型', // TODO check
        type: ShipType.DESTROYER,
        cost: 10,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
    },
];
