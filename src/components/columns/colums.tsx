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

export const shipNameColumn: ITableColumn<IShipDefinition> = {
    id: 'name',
    renderHeader: () => '艦名',
    renderCell: (data: IShipDefinition) => data.name,
    sortFn: (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
};

interface IShipNameColumnOptions {
    onClick: (shipId: string) => void;
    decorateName?: (name: ReactNode, data: IShipDefinition) => ReactNode;
}

export const createShipNameLinkColumn = (options: IShipNameColumnOptions): ITableColumn<IShipDefinition> => ({
    id: 'nameLink',
    renderHeader: () => '艦名',
    renderCell: (data: IShipDefinition) => {
        const render = options.decorateName ?? ((name: ReactNode, data: IShipDefinition) => name);
        return render(
            <Typography variant="body2">
                <ScriptedLink
                    onClick={() => {
                        options.onClick(data.id);
                    }}
                >
                    {data.name}
                </ScriptedLink>
            </Typography>,
            data,
        );
    },
    sortFn: (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
});

export const shipTypeColumn: ITableColumn<IShipDefinition> = {
    id: 'type',
    renderHeader: () => '艦種',
    renderCell: (data: IShipDefinition) => translateShipType(data.type, data.subType),
    sortFn: [
        (a, b) => shipTypeToSortValue(a.type, a.subType) - shipTypeToSortValue(b.type, b.subType),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
    initialSortDirection: 'asc',
};

export const shipRowColumn: ITableColumn<IShipDefinition> = {
    id: 'row',
    renderHeader: () => '配置',
    renderCell: (data: IShipDefinition) => translateShipRow(data.row),
    sortFn: [
        (a, b) => shipRowToSortValue(a.row) - shipRowToSortValue(b.row),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipCostColumn: ITableColumn<IShipDefinition> = {
    id: 'cost',
    renderHeader: () => 'コスト',
    renderCell: (data: IShipDefinition) => data.cost,
    sortFn: [
        (a, b) => a.cost - b.cost,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipOperationLimitColumn: ITableColumn<IShipDefinition> = {
    id: 'operationLimit',
    renderHeader: () => '稼働上限',
    renderCell: (data: IShipDefinition) => data.operationLimit,
    sortFn: [
        (a, b) => a.operationLimit - b.operationLimit,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipSourceColumn: ITableColumn<IShipDefinition> = {
    id: 'source',
    renderHeader: () => '入手方法',
    renderCell: (data: IShipDefinition) => translateShipSource(data.source),
    sortFn: [
        (a, b) => shipSourceToSortValue(a.source) - shipSourceToSortValue(b.source),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const manufacturerColumn: ITableColumn<IShipDefinition> = {
    id: 'manufacturer',
    renderHeader: () => '企業',
    renderCell: (data: IShipDefinition) => translateManufacturer(data.manufacturer),
    sortFn: [
        (a, b) => manufacturerToSortValue(a.manufacturer) - manufacturerToSortValue(b.manufacturer),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const researchManufacturerColumn: ITableColumn<IShipDefinition> = {
    id: 'researchManufacturer',
    renderHeader: () => '委託企業',
    renderCell: (data: IShipDefinition) => data.researchManufacturer ? translateResearchManufacturer(data.researchManufacturer) : null,
    sortFn: [
        (a, b) => (a.researchManufacturer ? researchManufacturerToSortValue(a.researchManufacturer) : 0) - (b.researchManufacturer ? researchManufacturerToSortValue(b.researchManufacturer) : 0),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const researchStrategyTypeColumn: ITableColumn<IShipDefinition> = {
    id: 'researchStrategyType',
    renderHeader: () => '戦略能力',
    renderCell: (data: IShipDefinition) => (
        <>
            {(data.researchStrategyTypes ?? []).map(researchStrategyType => (
                <Typography variant="body2" key={researchStrategyType}>
                    {translateResearchStrategyType(researchStrategyType)}
                </Typography>
            ))}
        </>
    ),
    sortFn: [
        (a, b) => (a.researchStrategyTypes?.[0] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[0]) : 0) - (b.researchStrategyTypes?.[0] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[0]) : 0),
        (a, b) => (a.researchStrategyTypes?.[1] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[1]) : 0) - (b.researchStrategyTypes?.[1] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[1]) : 0),
        (a, b) => (a.researchStrategyTypes?.[2] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[2]) : 0) - (b.researchStrategyTypes?.[2] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[2]) : 0),
        (a, b) => (a.researchStrategyTypes?.[3] ? researchStrategyTypeToSortValue(a.researchStrategyTypes[3]) : 0) - (b.researchStrategyTypes?.[3] ? researchStrategyTypeToSortValue(b.researchStrategyTypes[3]) : 0),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const researchTacticTypeColumn: ITableColumn<IShipDefinition> = {
    id: 'researchTacticType',
    renderHeader: () => '戦術性能',
    renderCell: (data: IShipDefinition) => (
        <>
            {(data.researchTacticTypes ?? []).map(researchTacticType => (
                <Typography variant="body2" key={researchTacticType}>
                    {translateResearchTacticType(researchTacticType)}
                </Typography>
            ))}
        </>
    ),
    sortFn: [
        (a, b) => (a.researchTacticTypes?.[0] ? researchTacticTypeToSortValue(a.researchTacticTypes[0]) : 0) - (b.researchTacticTypes?.[0] ? researchTacticTypeToSortValue(b.researchTacticTypes[0]) : 0),
        (a, b) => (a.researchTacticTypes?.[1] ? researchTacticTypeToSortValue(a.researchTacticTypes[1]) : 0) - (b.researchTacticTypes?.[1] ? researchTacticTypeToSortValue(b.researchTacticTypes[1]) : 0),
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipWeightColumn: ITableColumn<IShipDefinition> = {
    id: 'weight',
    renderHeader: () => '重み',
    renderCell: (data: IShipDefinition) => data.weight,
    sortFn: [
        (a, b) => a.weight - b.weight,
        (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
    ],
};

export const shipDpmShipColumn: ITableColumn<IShipDefinition> = createShipStatColumn('対艦DPM', 'dpmShip');
export const shipDpmAntiAirColumn: ITableColumn<IShipDefinition> = createShipStatColumn('対空DPM', 'dpmAntiAir');
export const shipDpmSiegeColumn: ITableColumn<IShipDefinition> = createShipStatColumn('攻城DPM', 'dpmSiege');
export const hpColumn: ITableColumn<IShipDefinition> = createShipStatColumn('HP', 'hp');
export const speedColumn: ITableColumn<IShipDefinition> = createShipStatColumn('巡航速度', 'speed');
export const warpSpeedColumn: ITableColumn<IShipDefinition> = createShipStatColumn('ワープ速度', 'warpSpeed');

function createShipStatColumn(name: string, statsProperty: keyof IStats): ITableColumn<IShipDefinition> {
    return {
        id: statsProperty,
        renderHeader: () => name,
        renderCell: (data: IShipDefinition) => formatDpm(getShipStatsPropertyAsNumber(data.id, statsProperty)),
        sortFn: [
            (a, b) => (getShipStatsPropertyAsNumber(a.id, statsProperty) ?? 0) - (getShipStatsPropertyAsNumber(b.id, statsProperty) ?? 0),
            (a, b) => a.name.localeCompare(b.name, 'ja-JP'),
        ],
    }
}

function getShipStatsPropertyAsNumber(shipId: string, statsProperty: keyof IStats): number | undefined {
    const value = getShipStats(shipId)?.[statsProperty];
    if (typeof value === 'boolean') {
        throw new Error(`${statsProperty} is not a numeric value`);
    }
    return value;
}
