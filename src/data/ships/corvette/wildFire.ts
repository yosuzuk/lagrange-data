import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const wildFire: IShipDefinition[] = [
    {
        id: ShipId.WILD_FIRE_TE,
        name: 'ワイルドファイヤー-TE',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 0,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
    },
];
