import { t } from '../../i18n';
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
        armor: false,
        shield: false,
        speed: false,
        accelerationTime: false,
        warpSpeed: false,
        flightTime: false,
        dpmShipPerCommandPoint: false,
        dpmAntiAirPerCommandPoint: false,
        dpmSiegePerCommandPoint: false,
        hpPerCommandPoint: false,
        source: false,
        manufacturer: false,
        researchManufacturer: false,
        researchTacticType: false,
        researchStrategyType: false,
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
            name: t('label.shipType'),
        },
        {
            columnKey: 'row',
            name: t('label.rowPlacement'),
        },
        {
            columnKey: 'cost',
            name: t('label.commandPoints'),
        },
        {
            columnKey: 'operationLimit',
            name: t('label.operationLimit'),
        },
        {
            columnKey: 'dpmShip',
            name: t('label.antiShipDpm'),
        },
        {
            columnKey: 'dpmAntiAir',
            name: t('label.antiAirDpm'),
        },
        {
            columnKey: 'dpmSiege',
            name: t('label.siegeDpm'),
        },
        {
            columnKey: 'hp',
            name: t('label.hp'),
        },
        {
            columnKey: 'armor',
            name: t('label.armor'),
        },
        {
            columnKey: 'shield',
            name: t('label.shield'),
        },
        {
            columnKey: 'speed',
            name: t('label.cruiseSpeed'),
        },
        {
            columnKey: 'accelerationTime',
            name: t('label.accelerationTime'),
        },
        {
            columnKey: 'warpSpeed',
            name: t('label.warpSpeed'),
        },
        {
            columnKey: 'flightTime',
            name: t('label.flightTime'),
        },
        {
            columnKey: 'dpmShipPerCommandPoint',
            name: t('label.antiShipDpmPerCommandPoint'),
        },
        {
            columnKey: 'dpmAntiAirPerCommandPoint',
            name: t('label.antiAirDpmPerCommandPoint'),
        },
        {
            columnKey: 'dpmSiegePerCommandPoint',
            name: t('label.siegeDpmPerCommandPoint'),
        },
        {
            columnKey: 'hpPerCommandPoint',
            name: t('label.hpPerCommandPoint'),
        },
        {
            columnKey: 'source',
            name: t('label.acquirableThrough'),
        },
        {
            columnKey: 'manufacturer',
            name: t('label.manufacturer'),
        },
        ...(disableResearchAgreementOptions !== true ? [
            {
                columnKey: 'researchManufacturer',
                name: t('label.researchManufacturerColumn'),
            },
            {
                columnKey: 'researchTacticType',
                name: t('label.researchTacticTypeColumn'),
            },
            {
                columnKey: 'researchStrategyType',
                name: t('label.researchStrategyTypeColumn'),
            },
        ] as IColumnConfigOption[] : []),
        {
            columnKey: 'weight',
            name: t('label.probabilityWeight'),
        },
    ];
}
