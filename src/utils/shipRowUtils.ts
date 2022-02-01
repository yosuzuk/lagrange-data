import { ShipRow } from '../types/ShipRow';

export function translateShipRow(row: ShipRow): string {
    switch (row) {
        case ShipRow.NONE:
            return '-';
        case ShipRow.FRONT:
            return '前列';
        case ShipRow.MIDDLE:
            return '中列';
        case ShipRow.BACK:
            return '後列';
    }
}

export function shipRowToSortValue(row: ShipRow): number {
    switch (row) {
        case ShipRow.NONE:
            return 4;
        case ShipRow.FRONT:
            return 1;
        case ShipRow.MIDDLE:
            return 2;
        case ShipRow.BACK:
            return 3;
    }
}
