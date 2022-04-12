import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';
import { ITableData, Table, useTable } from '../../table';
import { IResearchConfiguration } from './types/IResearchConfiguration';
import { serializeResearchFilterState } from './utils/researchAgreementUtils';

interface IProps {
    configurations: IResearchConfiguration[];
}

export const ResearchAgreementTable = (props: IProps) => {
    const { configurations } = props;
    const { table, setTableData } = useTable<IResearchConfiguration>();

    useEffect(() => {
        const tableData: ITableData<IResearchConfiguration> = {
            columns: [
                {
                    id: 'filter',
                    renderHeader: () => 'フィルター',
                    renderCell: (configuration => (
                        <Box sx={{ minWidth: '120px' }}>
                            {configuration.filterState.manufacturerFilter && (
                                <Typography variant="body2">{translateResearchManufacturer(configuration.filterState.manufacturerFilter)}</Typography>
                            )}
                            {configuration.filterState.strategyTypeFilter && (
                                <Typography variant="body2">{translateResearchStrategyType(configuration.filterState.strategyTypeFilter)}</Typography>
                            )}
                            {configuration.filterState.tacticTypeFilter && (
                                <Typography variant="body2">{translateResearchTacticType(configuration.filterState.tacticTypeFilter)}</Typography>
                            )}
                            {!configuration.filterState.manufacturerFilter && !configuration.filterState.strategyTypeFilter && !configuration.filterState.tacticTypeFilter && (
                                <Typography variant="body2">{'無し'}</Typography>
                            )}
                        </Box>
                    )),
                },
                {
                    id: 'totalShipChance',
                    renderHeader: () => '設計図',
                    renderCell: configuration => (
                        <Box sx={{ minWidth: '45px' }}>
                            <Typography variant="body2">{formatChance(configuration.totalShipChance)}</Typography>
                        </Box>
                    ),
                    sortFn: [
                        (a, b) => a.totalShipChance - b.totalShipChance,
                        (a, b) => b.techPointChance - a.techPointChance,
                        (a, b) => a.wishedShipChance - b.wishedShipChance,
                        (a, b) => b.unwishedShipChance - a.unwishedShipChance,
                    ],
                    initialSortDirection: 'desc',
                },
                {
                    id: 'totalModuleChance',
                    renderHeader: () => 'モジュール',
                    renderCell: configuration => (
                        <Box sx={{ minWidth: '45px' }}>
                            <Typography variant="body2">{formatChance(configuration.totalModuleChance)}</Typography>
                        </Box>
                    ),
                    sortFn: [
                        (a, b) => a.totalModuleChance - b.totalModuleChance,
                        (a, b) => a.totalShipChance - b.totalShipChance,
                        (a, b) => b.techPointChance - a.techPointChance,
                        (a, b) => a.wishedShipChance - b.wishedShipChance,
                        (a, b) => b.unwishedShipChance - a.unwishedShipChance,
                    ],
                    initialSortDirection: 'desc',
                },
                {
                    id: 'techPointChance',
                    renderHeader: () => '技術Pt',
                    renderCell: configuration => (
                        <Box sx={{ minWidth: '45px' }}>
                            <Typography variant="body2">{formatChance(configuration.techPointChance)}</Typography>
                        </Box>
                    ),
                    sortFn: [
                        (a, b) => a.techPointChance - b.techPointChance,
                        (a, b) => b.totalShipChance - a.totalShipChance,
                        (a, b) => b.wishedShipChance - a.wishedShipChance,
                        (a, b) => a.unwishedShipChance - b.unwishedShipChance,
                    ],
                },
                {
                    id: 'wishedShipChance',
                    renderHeader: () => '欲しい艦船',
                    renderCell: configuration => (
                        <Box sx={{ minWidth: '45px' }}>
                            <Typography variant="body2">{formatChance(configuration.wishedShipChance)}</Typography>
                        </Box>
                    ),
                    sortFn: [
                        (a, b) => a.wishedShipChance - b.wishedShipChance,
                        (a, b) => b.techPointChance - a.techPointChance,
                        (a, b) => a.totalShipChance - b.totalShipChance,
                        (a, b) => b.unwishedShipChance - a.unwishedShipChance,
                    ],
                },
                {
                    id: 'unwishedShipChance',
                    renderHeader: () => '欲しくない艦船',
                    renderCell: configuration => (
                        <Box sx={{ minWidth: '45px' }}>
                            <Typography variant="body2">{formatChance(configuration.unwishedShipChance)}</Typography>
                        </Box>
                    ),
                    sortFn: [
                        (a, b) => a.unwishedShipChance - b.unwishedShipChance,
                        (a, b) => b.totalShipChance - a.totalShipChance,
                        (a, b) => b.wishedShipChance - a.wishedShipChance,
                        (a, b) => a.techPointChance - b.techPointChance,
                    ],
                },
            ],
            data: configurations,
            rowIdFn: (configuration: IResearchConfiguration) => serializeResearchFilterState(configuration.filterState),
        };
        setTableData(tableData);
    }, [setTableData, configurations]);

    return (
        <Table table={table} size="small" />
    );
};

function formatChance(chance: number): string {
    return `${Number((chance * 100).toFixed(3))} %`;
}
