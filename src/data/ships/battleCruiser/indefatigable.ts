import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const indefatigable: IShipDefinition[] = [
    {
        id: ShipId.INDEFATIGABLE,
        name: 'ルドゥタブル級',
        type: ShipType.BATTLE_CRUISER,
        cost: 30,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 4,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.INDEFATIGABLE_TE_S],
    },
    {
        id: ShipId.INDEFATIGABLE_TE_S,
        name: 'ルドゥタブル級-TE（回収）',
        type: ShipType.BATTLE_CRUISER,
        cost: 30,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.INDEFATIGABLE],
    },
];
