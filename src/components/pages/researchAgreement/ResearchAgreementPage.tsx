import { useMemo, useState, memo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { createResearchConfiguration, getAllFilterCombinations, getFilteredResearchConfigurations, getShipDefinitionsForResearchAgreement } from './utils/researchAgreementUtils';
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { ResearchAgreementTable } from './ResearchAgreementTable';
import { ResearchAgreementShipsView } from './ResearchAgreementShipsView';
import { ViewMode, ViewModeSelection } from './ViewModeSelection';
import { IResearchFilterState } from './types/IResearchConfiguration';
import { ResearchFilter } from './ResearchFilter';

const MemoizedResearchAgreementTable = memo(ResearchAgreementTable);
const MemoizedResearchAgreementShipsView = memo(ResearchAgreementShipsView);

export const ResearchAgreementPage = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('ships');

    const shipDefinitions = useMemo(() => getShipDefinitionsForResearchAgreement(), []);
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
    const allFilterOptions = useMemo(() => getAllFilterCombinations(), []);
    const allResearchConfigurations = useMemo(() => allFilterOptions.map(filterState => {
        return createResearchConfiguration(filterState, shipDefinitions, userSettings);
    }), [allFilterOptions, shipDefinitions]);

    const [filterState, setFilterState] = useState<IResearchFilterState>({
        manufacturerFilter: null,
        strategyTypeFilter: null,
        tacticTypeFilter: null,
    });

    const filteredResearchConfigurations = useMemo(() => getFilteredResearchConfigurations(allResearchConfigurations, filterState), [allResearchConfigurations, filterState]);

    const filtered = !!filterState.manufacturerFilter || !!filterState.strategyTypeFilter || !!filterState.tacticTypeFilter;

    return (
        <>
            <NavigationBar currentRoute="/researchAgreement" />
            <Container>
                <Box p={1}>
                    <Stack spacing={1}>
                        <Paper>
                            <Box p={1}>
                                <ViewModeSelection mode={viewMode} onChange={setViewMode} />
                            </Box>
                        </Paper>
                        <Paper>
                            <Box p={2}>
                                <ResearchFilter filterState={filterState} onChange={setFilterState} />
                            </Box>
                        </Paper>
                        {viewMode === 'ships' && (
                            <MemoizedResearchAgreementShipsView configurations={filteredResearchConfigurations} filtered={filtered} />
                        )}
                        {viewMode === 'table' && (
                            <MemoizedResearchAgreementTable configurations={filteredResearchConfigurations} />
                        )}
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default ResearchAgreementPage;
