import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const mareTranquillitatis: IShipDefinition[] = [
    {
        id: ShipId.MARE_TRANQUILLITATIS_A,
        name: 'マーレトランキリタティス級　Ａ総合型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.MARE_TRANQUILLITATIS_B, ShipId.MARE_TRANQUILLITATIS_C],
        // defaultStats: {
        //     hp: 12360,
        // },
    },
    {
        id: ShipId.MARE_TRANQUILLITATIS_B,
        name: 'マーレトランキリタティス級　Ｂパルス型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.MARE_TRANQUILLITATIS_A,
        // defaultStats: {
        //     hp: 12360,
        // },
    },
    {
        id: ShipId.MARE_TRANQUILLITATIS_C,
        name: 'マーレトランキリタティス級　Ｃ対空型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.MARE_TRANQUILLITATIS_A,
        // defaultStats: {
        //     hp: 12360,
        // },
    },
];
