import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const guardian: IShipDefinition[] = [
    {
        id: ShipId.GUARDIAN_A,
        name: 'ガーディアン級　Ａ支援型',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.GUARDIAN_B, ShipId.GUARDIAN_C],
        defaultStats: {
            hp: 25650,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 3054,
            dpmAntiAir: 3500,
            dpmSiege: 349,
        },
    },
    {
        id: ShipId.GUARDIAN_B,
        name: 'ガーディアン級　Ｂ両用型',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.GUARDIAN_A,
        carryCorvette: 2,
        defaultStats: {
            hp: 25650,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 3054,
            dpmAntiAir: 1196,
            dpmSiege: 349,
        },
    },
    {
        id: ShipId.GUARDIAN_C,
        name: 'ガーディアン級　Ｃパルス型',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.GUARDIAN_A,
        defaultStats: {
            hp: 25650,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 6210,
            dpmAntiAir: 248,
            dpmSiege: 400,
        },
    },
];
