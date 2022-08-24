import { Manufacturer } from '../types/Manufacturer';
import { t } from '../i18n';

// 企業

export function translateManufacturer(manufacturer: Manufacturer): string {
    switch (manufacturer) {
        case Manufacturer.JUPITER_INDUSTRIES:
            return t('manufacturer.jupiterIndustries');
        case Manufacturer.NOMA_SHIPPING_GROUP:
            return t('manufacturer.nomaShippingGroup');
        case Manufacturer.ANTONIOS_CONSORTIUM:
            return t('manufacturer.antoniosConsortium');
        case Manufacturer.DAWN_ACCORD:
            return t('manufacturer.dawnAccord');
        case Manufacturer.HAYREDDIN_CLAN:
            return t('manufacturer.hayreddinClan');
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
        case Manufacturer.HAYREDDIN_CLAN:
            return 5;
    }
}
