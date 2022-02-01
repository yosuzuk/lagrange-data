import { ShipDefinition } from '../../../../types/ShipDefinition';

export function formatShipListForSharing(shipDefinitions: ShipDefinition[]): string {
    const title = '所持している艦船/設計図';
    const ships = shipDefinitions.map(shipDefinition => shipDefinition.name).join('\n');
    return `${title}\n\n${ships}`
}
