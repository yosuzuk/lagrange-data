import { shipDefinitions } from '../data/shipDefinitions';
import { IShipDefinition } from '../types/ShipDefinition';
import { ShipSource } from '../types/ShipSource';
import { ShipTag } from '../types/ShipTag';

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
