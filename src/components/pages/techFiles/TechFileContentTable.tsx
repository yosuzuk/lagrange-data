import { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Table, ITableData, useTable, ITableColumn } from '../../table';
import { IShipChance } from './types/IBlueprintChance';
import { formatChance } from './utils/techFileUtils';

const shipNameColumn: ITableColumn<IShipChance> = {
    id: 'name',
    renderHeader: () => '艦名',
    renderCell: (data: IShipChance) => data.name,
    sortFn: (a, b) => a.name.localeCompare(b.name),
};

const shipWeightColumn: ITableColumn<IShipChance> = {
    id: 'weight',
    renderHeader: () => '重み',
    renderCell: (data: IShipChance) => data.weight,
    sortFn: [
        (a, b) => a.weight - b.weight,
        (a, b) => a.name.localeCompare(b.name),
    ],
};

const baseChanceColumn: ITableColumn<IShipChance> = {
    id: 'baseChance',
    renderHeader: () => '艦種確率',
    renderCell: (data: IShipChance) => (
        <Tooltip
            arrow={true}
            title={data.baseChanceTooltip.map((text, index) => (
                <Typography key={index} variant="body1" paragraph={true}>{text}</Typography>
            ))}
        >
            <Typography variant="body1" component="span">
                {formatChance(data.baseChance)}
            </Typography>
        </Tooltip>
    ),
    sortFn: [
        (a, b) => a.baseChance - b.baseChance,
        (a, b) => a.name.localeCompare(b.name),
    ],
    initialSortDirection: 'desc',
};

const blueprintChanceColumn: ITableColumn<IShipChance> = {
    id: 'blueprintChance',
    renderHeader: () => '設計図',
    renderCell: (data: IShipChance) => (
        <Tooltip
            arrow={true}
            title={data.blueprintChanceTooltip.map((text, index) => (
                <Typography key={index} variant="body1" paragraph={true}>{text}</Typography>
            ))}
        >
            <Typography variant="body1" component="span">
                {formatChance(data.blueprintChance)}
            </Typography>
        </Tooltip>
    ),
    sortFn: [
        (a, b) => a.blueprintChance - b.blueprintChance,
        (a, b) => a.name.localeCompare(b.name),
    ],
};

const moduleChanceColumn: ITableColumn<IShipChance> = {
    id: 'moduleChance',
    renderHeader: () => '追加モジュール',
    renderCell: (data: IShipChance) => (
        <Tooltip
            arrow={true}
            title={data.moduleChanceTooltip.map((text, index) => (
                <Typography key={index} variant="body1" paragraph={true}>{text}</Typography>
            ))}
        >
            <Typography variant="body1" component="span">
                {formatChance(data.moduleChance)}
            </Typography>
        </Tooltip>
    ),
    sortFn: [
        (a, b) => a.moduleChance - b.moduleChance,
        (a, b) => a.name.localeCompare(b.name),
    ],
};

interface IProps {
    blueprintChances: IShipChance[];
    hasModules: boolean;
}

export const TechFileContentTable = (props: IProps) => {
    const { blueprintChances, hasModules } = props;
    const { table, setTableData } = useTable<IShipChance>();

    useEffect(() => {
        const tableData: ITableData<IShipChance> = {
            columns: [
                shipNameColumn,
                baseChanceColumn,
                blueprintChanceColumn,
                ...(hasModules ? [moduleChanceColumn] : []),
                shipWeightColumn,
            ],
            data: blueprintChances,
            rowIdFn: (data: IShipChance) => data.id,
        };
        setTableData(tableData);
    }, [setTableData, blueprintChances, hasModules]);

    return (
        <Table table={table} size="small" />
    );
};
