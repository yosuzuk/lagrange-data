import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const hayreddingsLoyal: IShipDefinition[] = [
    {
        id: ShipId.HAYREDDINGS_LOYAL,
        name: 'ハイレッディン　アストロトレーサー',
        translatedName: {
            en: 'Hayreddin\'s Loyal - Pulsar Fighter',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.HAYREDDIN_CLAN,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        // defaultStats: {
        //     hp: 6480,
        // },
    },
];
