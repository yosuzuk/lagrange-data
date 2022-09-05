import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { ScriptedLink } from '../link/ScriptedLink';
import { IShipDefinition } from '../../types/ShipDefinition';
import { translateShipRow, shipRowToSortValue } from '../../utils/shipRowUtils';
import { translateShipSource, shipSourceToSortValue } from '../../utils/shipSourceUtils';
import { translateShipType, shipTypeToSortValue } from '../../utils/shipTypeUtils';
import { ITableColumn } from '../table';
import { manufacturerToSortValue, translateManufacturer } from '../../utils/manufacturerUtils';
import { researchStrategyTypeToSortValue, translateResearchStrategyType } from '../../utils/researchStrategyTypeUtils';
import { researchTacticTypeToSortValue, translateResearchTacticType } from '../../utils/researchTacticTypeUtils';
import { translateResearchManufacturer, researchManufacturerToSortValue } from '../../utils/researchManufacturerUtils';
import { formatDpm, getShipStats } from '../../utils/shipStatsUtils';
import { IStats } from '../../types/IStats';
import { getShipDefinitionById, getShipName } from '../../utils/shipDefinitionUtils';
import { t, getCurrentLanguage } from '../../i18n';

export const shipNameColumn: ITableColumn<IShipDefinition> = {
    id: 'name',
    renderHeader: () => t('label.shipName'),
    renderCell: (data: IShipDefinition) => getShipName(data),
    sortFn: (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
};

interface IShipNameColumnOptions {
    onClick: (shipId: string) => void;
    decorateName?: (name: ReactNode, data: IShipDefinition) => ReactNode;
}

export const createShipNameLinkColumn = (options: IShipNameColumnOptions): ITableColumn<IShipDefinition> => ({
    id: 'nameLink',
    renderHeader: () => t('label.shipName'),
    renderCell: (data: IShipDefinition) => {
        const render = options.decorateName ?? ((name: ReactNode, data: IShipDefinition) => name);
        return render(
            <Typography variant="body2">
                <ScriptedLink
                    onClick={() => {
                        options.onClick(data.id);
                    }}
                >
                    {getShipName(data)}
                </ScriptedLink>
            </Typography>,
            data,
        );
    },
    sortFn: (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
});

export const shipTypeColumn: ITableColumn<IShipDefinition> = {
    id: 'type',
    renderHeader: () => t('label.shipType'),
    renderCell: (data: IShipDefinition) => translateShipType(data.type, data.subType),
    sortFn: [
        (a, b) => shipTypeToSortValue(a.type, a.subType) - shipTypeToSortValue(b.type, b.subType),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
    initialSortDirection: 'asc',
};

export const shipRowColumn: ITableColumn<IShipDefinition> = {
    id: 'row',
    renderHeader: () => t('label.rowPlacement'),
    renderCell: (data: IShipDefinition) => translateShipRow(data.row),
    sortFn: [
        (a, b) => shipRowToSortValue(a.row) - shipRowToSortValue(b.row),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const shipCostColumn: ITableColumn<IShipDefinition> = {
    id: 'cost',
    renderHeader: () => t('label.commandPoints'),
    renderCell: (data: IShipDefinition) => data.cost,
    sortFn: [
        (a, b) => a.cost - b.cost,
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const shipOperationLimitColumn: ITableColumn<IShipDefinition> = {
    id: 'operationLimit',
    renderHeader: () => t('label.operationLimit'),
    renderCell: (data: IShipDefinition) => data.operationLimit,
    sortFn: [
        (a, b) => a.operationLimit - b.operationLimit,
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const shipSourceColumn: ITableColumn<IShipDefinition> = {
    id: 'source',
    renderHeader: () => t('label.acquirableThrough'),
    renderCell: (data: IShipDefinition) => translateShipSource(data.source),
    sortFn: [
        (a, b) => shipSourceToSortValue(a.source) - shipSourceToSortValue(b.source),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const manufacturerColumn: ITableColumn<IShipDefinition> = {
    id: 'manufacturer',
    renderHeader: () => t('label.manufacturer'),
    renderCell: (data: IShipDefinition) => translateManufacturer(data.manufacturer),
    sortFn: [
        (a, b) => manufacturerToSortValue(a.manufacturer) - manufacturerToSortValue(b.manufacturer),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const researchManufacturerColumn: ITableColumn<IShipDefinition> = {
    id: 'researchManufacturer',
    renderHeader: () => t('label.researchManufacturerColumn'),
    renderCell: (data: IShipDefinition) => data.researchManufacturer ? translateResearchManufacturer(data.researchManufacturer) : '-',
    sortFn: [
        (a, b) => (a.researchManufacturer ? researchManufacturerToSortValue(a.researchManufacturer) : 0) - (b.researchManufacturer ? researchManufacturerToSortValue(b.researchManufacturer) : 0),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const researchStrategyTypeColumn: ITableColumn<IShipDefinition> = {
    id: 'researchStrategyType',
    renderHeader: () => t('label.researchStrategyTypeColumn'),
    renderCell: (data: IShipDefinition) => (
        <>
            {data.researchStrategyTypes?.map(researchStrategyType => (
                <Typography variant="body2" key={researchStrategyType}>
                    {translateResearchStrategyType(researchStrategyType)}
                </Typography>
            )) ?? '-'}
        </>
    ),
    sortFn: [
        (a, b) => (a.researchStrategyTypes?.[0] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[0]) : 0) - (b.researchStrategyTypes?.[0] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[0]) : 0),
        (a, b) => (a.researchStrategyTypes?.[1] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[1]) : 0) - (b.researchStrategyTypes?.[1] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[1]) : 0),
        (a, b) => (a.researchStrategyTypes?.[2] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[2]) : 0) - (b.researchStrategyTypes?.[2] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[2]) : 0),
        (a, b) => (a.researchStrategyTypes?.[3] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[3]) : 0) - (b.researchStrategyTypes?.[3] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[3]) : 0),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const researchTacticTypeColumn: ITableColumn<IShipDefinition> = {
    id: 'researchTacticType',
    renderHeader: () => t('label.researchTacticTypeColumn'),
    renderCell: (data: IShipDefinition) => (
        <>
            {data.researchTacticTypes?.map(researchTacticType => (
                <Typography variant="body2" key={researchTacticType}>
                    {translateResearchTacticType(researchTacticType)}
                </Typography>
            )) ?? '-'}
        </>
    ),
    sortFn: [
        (a, b) => (a.researchTacticTypes?.[0] ? researchTacticTypeToSortValue(a.researchTacticTypes[0]) : 0) - (b.researchTacticTypes?.[0] ? researchTacticTypeToSortValue(b.researchTacticTypes[0]) : 0),
        (a, b) => (a.researchTacticTypes?.[1] ? researchTacticTypeToSortValue(a.researchTacticTypes[1]) : 0) - (b.researchTacticTypes?.[1] ? researchTacticTypeToSortValue(b.researchTacticTypes[1]) : 0),
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const shipWeightColumn: ITableColumn<IShipDefinition> = {
    id: 'weight',
    renderHeader: () => t('label.probabilityWeight'),
    renderCell: (data: IShipDefinition) => data.weight,
    sortFn: [
        (a, b) => a.weight - b.weight,
        (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
    ],
};

export const shipDpmShipColumn: ITableColumn<IShipDefinition> = createShipStatColumn(t('label.antiShipDpm'), 'dpmShip');
export const shipDpmAntiAirColumn: ITableColumn<IShipDefinition> = createShipStatColumn(t('label.antiAirDpm'), 'dpmAntiAir');
export const shipDpmSiegeColumn: ITableColumn<IShipDefinition> = createShipStatColumn(t('label.siegeDpm'), 'dpmSiege');
export const hpColumn: ITableColumn<IShipDefinition> = createShipStatColumn(t('label.hp'), 'hp');
export const speedColumn: ITableColumn<IShipDefinition> = createShipStatColumn(t('label.cruiseSpeed'), 'speed');
export const warpSpeedColumn: ITableColumn<IShipDefinition> = createShipStatColumn(t('label.warpSpeed'), 'warpSpeed');

export const shipDpmShipPerCommandPointColumn: ITableColumn<IShipDefinition> = createShipStatPerCommandPointColumn(t('label.antiShipDpmPerCommandPoint'), 'dpmShip');
export const shipDpmAntiAirPerCommandPointColumn: ITableColumn<IShipDefinition> = createShipStatPerCommandPointColumn(t('label.antiAirDpmPerCommandPoint'), 'dpmAntiAir');
export const shipDpmSiegePerCommandPointColumn: ITableColumn<IShipDefinition> = createShipStatPerCommandPointColumn(t('label.siegeDpmPerCommandPoint'), 'dpmSiege');
export const hpPerCommandPointColumn: ITableColumn<IShipDefinition> = createShipStatPerCommandPointColumn(t('label.hpPerCommandPoint'), 'hp');

function createShipStatColumn(name: string, statsProperty: keyof IStats): ITableColumn<IShipDefinition> {
    return {
        id: statsProperty,
        renderHeader: () => name,
        renderCell: (data: IShipDefinition) => formatDpm(getShipStatsPropertyAsNumber(data.id, statsProperty)),
        sortFn: [
            (a, b) => (getShipStatsPropertyAsNumber(a.id, statsProperty) ?? 0) - (getShipStatsPropertyAsNumber(b.id, statsProperty) ?? 0),
            (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
        ],
    }
}

function createShipStatPerCommandPointColumn(name: string, statsProperty: keyof IStats): ITableColumn<IShipDefinition> {
    return {
        id: `${statsProperty}_per_command_point`,
        renderHeader: () => name,
        renderCell: (data: IShipDefinition) => formatDpm(getShipStatsPropertyPerCommandPointAsNumber(data, statsProperty), 0),
        sortFn: [
            (a, b) => (getShipStatsPropertyPerCommandPointAsNumber(a, statsProperty) ?? 0) - (getShipStatsPropertyPerCommandPointAsNumber(b, statsProperty) ?? 0),
            (a, b) => getShipName(a).localeCompare(getShipName(b), getCurrentLanguage()),
        ],
    }
}

function getShipStatsPropertyAsNumber(shipId: string, statsProperty: keyof IStats): number | null {
    const value = getShipStats(getShipDefinitionById(shipId), null)?.[statsProperty] ?? null;
    if (typeof value === 'boolean') {
        throw new Error(`${statsProperty} is not a numeric value`);
    }
    return value;
}

function getShipStatsPropertyPerCommandPointAsNumber(shipDefinition: IShipDefinition, statsProperty: keyof IStats): number | null {
    if (shipDefinition.cost === 0) {
        return null;
    }

    const value = getShipStatsPropertyAsNumber(shipDefinition.id, statsProperty);
    if (typeof value === 'boolean') {
        throw new Error(`${statsProperty} is not a numeric value`);
    }
    return value === null ? null : (value / shipDefinition.cost);
}
