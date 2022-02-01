import { ShipRow } from '../../../types/ShipRow';
import { ShipType } from '../../../types/ShipType';

export type FilterKey = ShipType | ShipRow | 'all';

export type ShipFilterState = Record<FilterKey, boolean>;
