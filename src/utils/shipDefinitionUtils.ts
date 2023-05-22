import { shipDefinitions } from '../data/shipDefinitions';
import { getCurrentLanguage } from '../i18n';
import { IShipStatsAndLocalization } from '../types/externalData';
import { IShipDefinition, ISystemModule } from '../types/ShipDefinition';
import { ShipSource } from '../types/ShipSource';
import { ShipTag } from '../types/ShipTag';
import { getShipStatsAndLocalizationByShipId } from './externalDataUtils';
import { shipTypeToSortValue } from './shipTypeUtils';
import { normalizeSortFn } from './sortingUtils';

const shipDefinitionsById: Record<string, IShipDefinition> = shipDefinitions.reduce((result, next) => ({
    ...result,
    [next.id]: next,
}), {});

export function getShipDefinitionById(shipId: string): IShipDefinition {
    if (!shipDefinitionsById[shipId]) {
        throw new Error(`Invalid ship id "${shipId}"`);
    }
    return shipDefinitionsById[shipId];
}

export function getShipDefinitionIdsByTag(tag: ShipTag): string[] {
    return shipDefinitions
        .filter(ship => (ship.tags ?? []).includes(tag))
        .map(ship => ship.id);
}

export function isShipObtainableThroughTechFile(shipId: string) {
    const definition = getShipDefinitionById(shipId);
    return definition.source === ShipSource.TECH_FILE || definition.source === ShipSource.STARTER_SHIP;
}

export function getShipName(shipDefinition: IShipDefinition): string {
    const language = getCurrentLanguage();

    if (language === 'ja') {
        return shipDefinition.name;
    }

    // lookup our own data
    if (shipDefinition.translatedName?.[language]) {
        return shipDefinition.translatedName[language];
    }

    // lookup externally provided data
    const property = language.toUpperCase() as keyof IShipStatsAndLocalization;
    return getShipStatsAndLocalizationByShipId(shipDefinition.id)?.[property] ?? shipDefinition.name;
}

export function getModuleName(shipId: string, module: ISystemModule): string {
    const language = getCurrentLanguage();

    if (language === 'ja') {
        return module.name;
    }

    if (module.translatedName?.[language]) {
        return module.translatedName[language];
    }

    return module.name;
}

export function sortShipDefinitionsByTypeAndName(shipDefinitions: IShipDefinition[]): IShipDefinition[] {
    const sortByTypeAndName = normalizeSortFn<IShipDefinition>([
        (a, b) => shipTypeToSortValue(a.type, a.subType) - shipTypeToSortValue(b.type, b.subType),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ]);

    return [...shipDefinitions].sort(sortByTypeAndName);
}
