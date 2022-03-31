import { Manufacturer } from '../../../types/Manufacturer';
import { ShipRow } from '../../../types/ShipRow';
import { ShipType } from '../../../types/ShipType';

export type FilterKey = ShipType | ShipRow | Manufacturer | 'all';

export type ShipFilterState = Record<FilterKey, boolean>;
