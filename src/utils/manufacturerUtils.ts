import { Manufacturer } from '../types/Manufacturer';

export function translateManufacturer(manufacturer: Manufacturer): string {
    switch (manufacturer) {
        case Manufacturer.JUPITER_INDUSTRIES:
            return 'ジュピターインダストリー';
        case Manufacturer.NOMA_SHIPPING_GROUP:
            return 'ノマシッピング';
        case Manufacturer.ANTONIOS_CONSORTIUM:
            return 'アントニオス';
        case Manufacturer.DAWN_ACCORD:
            return 'ドーン基準';
    }
}

export function manufacturerToSortValue(manufacturer: Manufacturer): number {
    switch (manufacturer) {
        case Manufacturer.JUPITER_INDUSTRIES:
            return 1;
        case Manufacturer.NOMA_SHIPPING_GROUP:
            return 2;
        case Manufacturer.ANTONIOS_CONSORTIUM:
            return 3;
        case Manufacturer.DAWN_ACCORD:
            return 4;
    }
}
