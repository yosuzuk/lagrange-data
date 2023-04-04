import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';
import { ITableColumn, ITableData, Table, useTable } from '../../table';
import { IResearchConfiguration, IResearchFilterState } from './types/IResearchConfiguration';
import { serializeResearchFilterState } from './utils/researchAgreementUtils';
import { ScriptedLink } from '../../link/ScriptedLink';
import { t } from '../../../i18n';

interface IProps {
    configurations: IResearchConfiguration[];
    filterState: IResearchFilterState;
    onClickConfiguration: (confiugration: IResearchConfiguration | null) => void;
}

export const ResearchAgreementTable = (props: IProps) => {
    const { configurations, filterState, onClickConfiguration } = props;
    const { table, setTableData } = useTable<IResearchConfiguration>();

    const theme = useTheme();
    const downSm = useMediaQuery(theme.breakpoints.down('sm'));
    const chanceCellMinWidth = downSm ? '38px' : '50px';

    const filterStateShipId = filterState.shipId;

    useEffect(() => {
        const tableData: ITableData<IResearchConfiguration> = {
            columns: [
                {
                    id: 'filter',
                    renderHeader: () => t('label.researchDirection'),
                    renderCell: (configuration => (
                        <Box component="div" sx={{ minWidth: '120px' }}>
                            {configuration.filterState.manufacturerFilter && (
                                <Typography variant="body2">
                                    <ScriptedLink onClick={() => onClickConfiguration(configuration)}>
                                        {translateResearchManufacturer(configuration.filterState.manufacturerFilter)}
                                    </ScriptedLink>
                                </Typography>
                            )}
                            {configuration.filterState.tacticTypeFilter && (
                                <Typography variant="body2">
                                    <ScriptedLink onClick={() => onClickConfiguration(configuration)}>
                                        {translateResearchTacticType(configuration.filterState.tacticTypeFilter)}
                                    </ScriptedLink>
                                </Typography>
                            )}
                            {configuration.filterState.strategyTypeFilter && (
                                <Typography variant="body2">
                                    <ScriptedLink onClick={() => onClickConfiguration(configuration)}>
                                        {translateResearchStrategyType(configuration.filterState.strategyTypeFilter)}
                                    </ScriptedLink>
                                </Typography>
                            )}
                            {!configuration.filterState.manufacturerFilter && !configuration.filterState.strategyTypeFilter && !configuration.filterState.tacticTypeFilter && (
                                <Typography variant="body2">
                                    <ScriptedLink onClick={() => onClickConfiguration(configuration)}>
                                        {t('label.notSelected')}
                                    </ScriptedLink>
                                </Typography>
                            )}
                        </Box>
                    )),
                },
                ...(filterStateShipId ? [{
                    id: 'selectedShipChance',
                    renderHeader: () => t('label.selectedShip'),
                    renderCell: configuration => (
                        <Box component="div" sx={{ minWidth: chanceCellMinWidth }}>
                            <Typography variant="body2">{formatChance(getSelectedShipChange(configuration, filterStateShipId))}</Typography>
                        </Box>
                    ),
                    sortFn: [
                        (a, b) => getSelectedShipChange(a, filterStateShipId) - getSelectedShipChange(b, filterStateShipId),
                        (a, b) => a.totalShipChance - b.totalShipChance,
                        (a, b) => b.techPointChance - a.techPointChance,
                        (a, b) => a.wishedShipChance - b.wishedShipChance,
                        (a, b) => b.unwishedShipChance - a.unwishedShipChance,
                    ],
                } as ITableColumn<IResearchConfiguration>] : []),
                {
                    id: 'totalShipChance',
                    renderHeader: () => t('label.newShip'),
                    renderCell: configuration => (
                        <Box component="div" sx={{ minWidth: chanceCellMinWidth }}>
                            <Typography variant="body2">{formatChance(configuration.totalShipChance)}</Typography>
                        </Box>
                    ),
                    sortFn: [
                        (a, b) => a.totalShipChance - b.totalShipChance,
                        (a, b) => b.techPointChance - a.techPointChance,
                        (a, b) => a.wishedShipChance - b.wishedShipChance,
                        (a, b) => b.unwishedShipChance - a.unwishedShipChance,
                    ],
                },
                {
                    id: 'totalModuleChance',
                    renderHeader: () => t('label.additionalSystemModule'),
                    renderCell: configuration => (
                        <Box component="div" sx={{ minWidth: chanceCellMinWidth }}>
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
                },
                {
                    id: 'techPointChance',
                    renderHeader: () => t('label.techPoints'),
                    renderCell: configuration => (
                        <Box component="div" sx={{ minWidth: chanceCellMinWidth }}>
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
                    renderHeader: () => t('label.wantedBlueprint'),
                    renderCell: configuration => (
                        <Box component="div" sx={{ minWidth: chanceCellMinWidth }}>
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
                    renderHeader: () => t('label.unwantedBlueprint'),
                    renderCell: configuration => (
                        <Box component="div" sx={{ minWidth: chanceCellMinWidth }}>
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
    }, [setTableData, configurations, filterStateShipId, onClickConfiguration, chanceCellMinWidth]);

    return (
        <Table table={table} size="small" />
    );
};

function formatChance(chance: number): string {
    return `${Number((chance * 100).toFixed(2))} %`;
}

function getSelectedShipChange(configuration: IResearchConfiguration, shipId: string): number {
    return configuration.shipChances.find(shipChance => shipChance.shipDefinition.id === shipId)?.chance ?? 0;
}
