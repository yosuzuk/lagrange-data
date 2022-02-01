import { ShipRow } from '../../../types/ShipRow';
import { ShipType } from '../../../types/ShipType';

export interface IFilterOption {
    filterKey: ShipType | ShipRow;
    name: string;
}
