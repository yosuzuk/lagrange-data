import { ShipRow } from '../types/ShipRow';
import { t } from '../i18n';

export function translateShipRow(row: ShipRow): string {
    switch (row) {
        case ShipRow.NONE:
            return '-';
        case ShipRow.FRONT:
            return t('rowPlacement.frontRow');
        case ShipRow.MIDDLE:
            return t('rowPlacement.middleRow');
        case ShipRow.BACK:
            return t('rowPlacement.backRow');
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
