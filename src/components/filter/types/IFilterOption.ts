import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { ShipRow } from '../../../types/ShipRow';
import { ShipType } from '../../../types/ShipType';

export interface IFilterOption {
    filterKey: ShipType | ShipRow | Manufacturer | ResearchManufacturer | ResearchStrategyType | ResearchTacticType;
    name: string;
}
