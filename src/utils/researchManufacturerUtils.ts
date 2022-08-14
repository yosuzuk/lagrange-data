import { t } from '../i18n';
import { ResearchManufacturer } from '../types/ResearchManufacturer';

// 委託企業

export function translateResearchManufacturer(manufacturer: ResearchManufacturer): string {
    switch (manufacturer) {
        case ResearchManufacturer.JUPITER_INDUSTRIES:
            return t('manufacturer.jupiterIndustries');
        case ResearchManufacturer.NOMA_SHIPPING_GROUP:
            return t('manufacturer.nomaShippingGroup');
        case ResearchManufacturer.ANTONIOS_CONSORTIUM:
            return t('manufacturer.antoniosConsortium');
        case ResearchManufacturer.DAWN_ACCORD:
            return t('manufacturer.dawnAccord');
    }
}

export function researchManufacturerToSortValue(manufacturer: ResearchManufacturer): number {
    switch (manufacturer) {
        case ResearchManufacturer.JUPITER_INDUSTRIES:
            return 1;
        case ResearchManufacturer.NOMA_SHIPPING_GROUP:
            return 2;
        case ResearchManufacturer.ANTONIOS_CONSORTIUM:
            return 3;
        case ResearchManufacturer.DAWN_ACCORD:
            return 4;
    }
}
