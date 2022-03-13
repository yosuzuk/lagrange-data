import { ShipRow } from '../../../../types/ShipRow';
import { ShipType } from '../../../../types/ShipType';

export interface IFleetShipCount {
    shipCount: number;
    shipCountByType: Record<ShipType, number>;
    shipCountByRow: Record<ShipRow, number>;
    totalCost: number;
}
