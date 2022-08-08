import { IColumnConfig, IColumnConfigOption } from './types/IColumnConfig';

export function createInitialColumnConfig(flags: Partial<IColumnConfig> = {}): IColumnConfig {
    return {
        name: true,
        type: false,
        row: false,
        cost: false,
        operationLimit: false,
        dpmShip: false,
        dpmAntiAir: false,
        dpmSiege: false,
        hp: false,
        speed: false,
        warpSpeed: false,
        source: false,
        manufacturer: false,
        researchManufacturer: false,
        researchStrategyType: false,
        researchTacticType: false,
        weight: false,
        ...flags,
    };
}

interface ICreateColumnConfigOptionArguments {
    disableResearchAgreementOptions?: boolean;
}

export function createColumnConfigOptions(args: ICreateColumnConfigOptionArguments): IColumnConfigOption[] {
    const { disableResearchAgreementOptions } = args;
    return [
        {
            columnKey: 'type',
            name: '艦種',
        },
        {
            columnKey: 'row',
            name: '配置',
        },
        {
            columnKey: 'cost',
            name: 'コスト',
        },
        {
            columnKey: 'operationLimit',
            name: '稼働上限',
        },
        {
            columnKey: 'dpmShip',
            name: '対艦DPM',
        },
        {
            columnKey: 'dpmAntiAir',
            name: '対空DPM',
        },
        {
            columnKey: 'dpmSiege',
            name: '攻城DPM',
        },
        {
            columnKey: 'hp',
            name: 'HP',
        },
        {
            columnKey: 'speed',
            name: '巡航速度',
        },
        {
            columnKey: 'warpSpeed',
            name: 'ワープ速度',
        },
        {
            columnKey: 'source',
            name: '入手方法',
        },
        {
            columnKey: 'manufacturer',
            name: '企業',
        },
        ...(disableResearchAgreementOptions !== true ? [
            {
                columnKey: 'researchManufacturer',
                name: '委託企業（研究協定）',
            },
            {
                columnKey: 'researchStrategyType',
                name: '戦略能力（研究協定）',
            },
            {
                columnKey: 'researchTacticType',
                name: '戦術性能（研究協定）',
            },
        ] as IColumnConfigOption[] : []),
        {
            columnKey: 'weight',
            name: '確率の重み',
        },
    ];
}
