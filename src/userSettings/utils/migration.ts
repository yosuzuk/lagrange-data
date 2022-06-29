import { ShipId } from '../../data/shipIds';

export function migrateShipId(shipId: string): string {
    switch (shipId) {
        case 'AC721_C': {
            return ShipId.AC721_TE_A;
        }
        case 'FCV830': {
            return ShipId.FSV830;
        }
        case 'FCV830_TE_PREVIEW1': {
            return ShipId.FSV830_TE_PREVIEW1;
        }
        case 'FCV830_TE_PREVIEW2': {
            return ShipId.FSV830_TE_PREVIEW2;
        }
        case 'FCV830_TE_PREVIEW3': {
            return ShipId.FSV830_TE_PREVIEW3;
        }
        case 'FCV830_TE_PREVIEW4': {
            return ShipId.FSV830_TE_PREVIEW4;
        }
        case 'FCV830_TE_PREVIEW5': {
            return ShipId.FSV830_TE_PREVIEW5;
        }
        default: {
            return shipId;
        }
    }
}
