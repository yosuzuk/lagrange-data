import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { createResearchConfiguration, getAllFilterCombinations, getShipDefinitionsForResearchAgreement } from './utils/researchAgreementUtils';
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../userSettings/utils/userSettingsUtils';

export const ResearchAgreementPage = () => {
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
                    <Paper>
                        <Box p={1}>
                            <pre>
                            {JSON.stringify(allResearchConfigurations, null, 2)}
                            </pre>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default ResearchAgreementPage;
