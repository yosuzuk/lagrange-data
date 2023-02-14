import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const crasher: IShipDefinition[] = [
    {
        id: ShipId.CRASHER_A,
        name: 'クラッシャー級　Ａ一般型',
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
    },
    {
        id: ShipId.CRASHER_B,
        name: 'クラッシャー級　Ｂ艦載型',
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryFighter: 3,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER
    },
];
