import { ResearchManufacturer } from '../types/ResearchManufacturer';

// 委託企業

export function translateResearchManufacturer(manufacturer: ResearchManufacturer): string {
    switch (manufacturer) {
        case ResearchManufacturer.JUPITER_INDUSTRIES:
            return 'ジュピターインダストリー';
        case ResearchManufacturer.NOMA_SHIPPING_GROUP:
            return 'ノマシッピング';
        case ResearchManufacturer.ANTONIOS_CONSORTIUM:
            return 'アントニオス財団';
        case ResearchManufacturer.DAWN_ACCORD:
            return 'ドーン協定条約機構';
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
