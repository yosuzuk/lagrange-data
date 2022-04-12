import { useMemo, useState, memo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { createResearchConfiguration, getAllFilterCombinations, getShipDefinitionsForResearchAgreement } from './utils/researchAgreementUtils';
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { ResearchAgreementTable } from './ResearchAgreementTable';
import { ResearchAgreementTreeView } from './ResearchAgreementTreeView';
import { ViewMode, ViewModeSelection } from './ViewModeSelection';

const MemoizedResearchAgreementTable = memo(ResearchAgreementTable);

export const ResearchAgreementPage = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('tree');

    const shipDefinitions = useMemo(() => getShipDefinitionsForResearchAgreement(), []);
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
    const allFilterOptions = useMemo(() => getAllFilterCombinations(), []);
    const allResearchConfigurations = useMemo(() => allFilterOptions.map(filterState => {
        return createResearchConfiguration(filterState, shipDefinitions, userSettings);
    }), [allFilterOptions, shipDefinitions]);

    return (
        <>
            <NavigationBar currentRoute="/researchAgreement" />
            <Container>
                <Box p={1}>
                    <Stack spacing={1}>
                        <ViewModeSelection mode={viewMode} onChange={setViewMode} />
                        <Paper>
                            <Box p={1}>
                                <pre>
                                {/*JSON.stringify(allResearchConfigurations, null, 2)*/}
                                </pre>
                            </Box>
                        </Paper>
                        {viewMode === 'tree' && (
                            <ResearchAgreementTreeView configurations={allResearchConfigurations} />
                        )}
                        {viewMode === 'table' && (
                            <MemoizedResearchAgreementTable configurations={allResearchConfigurations} />
                        )}
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default ResearchAgreementPage;
