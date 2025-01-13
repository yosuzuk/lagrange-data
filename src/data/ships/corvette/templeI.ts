import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const staticModules: ISystemModule[] = [
    modules.static({
        id: 'w1',
        name: '反撃砲システム',
        translatedName: {
            en: 'Counter Cannon System',
        },
        mainSystem: false,
        skillComplete: false,
        skills: [
            // TODO
        ],
        skillSlots: 4,
        dpmShip: 600,
        dpmAntiAir: 432,
        dpmSiege: 0,
    }),
    modules.commandSystem({
        skillComplete: false,
        skillSlots: 0,
    }),
    modules.armorSystem({
        skillComplete: false,
        skills: [
            // TODO
        ],
        skillSlots: 3,
    }),
    modules.propulsionSystem({
        skillComplete: false,
        skills: [
            // TODO
        ],
        skillSlots: 3,
    }),
];

export const templeI: IShipDefinition[] = [
    {
        id: ShipId.TEMPLE_I_A,
        name: 'タンプル1号　Ａ干渉型',
        translatedName: {
            en: 'Temple I - Interference Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [],
        subModelIds: [ShipId.TEMPLE_I_B],
        modules: [
            modules.static({
                id: 's1',
                name: '情報戦システム',
                translatedName: {
                    en: 'Information Warfare System',
                },
                mainSystem: true,
                skillComplete: false,
                skills: [
                    // TODO
                ],
                skillSlots: 6,
            }),
            ...staticModules,
        ],
        defaultStats: {
            hp: 7000,
            armor: 2,
            shield: 0,
            speed: 2400,
            warpSpeed: 12500,
            dpmShip: 120,
            dpmAntiAir: 432,
            dpmSiege: 0,
        },
    },
    {
        id: ShipId.TEMPLE_I_B,
        name: 'タンプル1号　Ｂ警報型',
        translatedName: {
            en: 'Temple I - Alert Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [],
        baseModelId: ShipId.TEMPLE_I_A,
        modules: [
            modules.static({
                id: 's1',
                name: '電子偵察システム',
                translatedName: {
                    en: 'Electronic Recon System',
                },
                mainSystem: true,
                skillComplete: false,
                skills: [
                    // TODO
                ],
                skillSlots: 5,
            }),
            ...staticModules,
        ],
        defaultStats: {
            hp: 7100,
            armor: 2,
            shield: 0,
            speed: 2400,
            warpSpeed: 12500,
            dpmShip: 600,
            dpmAntiAir: 432,
            dpmSiege: 0,
        },
    },
];
