import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const argus: IShipDefinition[] = [
    {
        id: ShipId.ARGUS_A,
        name: 'アーガス級　Ａ一般型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryFighter: 1,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    },
];
