import { useMemo, useState, memo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavigationBar } from '../../navigation/NavigationBar';
import { createResearchConfiguration, getAllFilterCombinations, getFilteredResearchConfigurations, getShipDefinitionsForResearchAgreement, getShipFilterOptions } from './utils/researchAgreementUtils';
import { IUserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { ResearchAgreementTable } from './ResearchAgreementTable';
import { ResearchAgreementShipsView } from './ResearchAgreementShipsView';
import { ViewMode, ViewModeSelection } from './ViewModeSelection';
import { IResearchConfiguration, IResearchFilterState } from './types/IResearchConfiguration';
import { ResearchFilter } from './ResearchFilter';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { ConfigurationDetail } from './ConfigurationDetail';
import { ConfigurationSummary } from './ConfigurationSummary';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { t } from '../../../i18n';
import { EnvironmentSetting } from './EnvironmentSetting';
import { Season } from './types/Season';

const MemoizedResearchAgreementTable = memo(ResearchAgreementTable);
const MemoizedResearchAgreementShipsView = memo(ResearchAgreementShipsView);

export const ResearchAgreementPage = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('ships');
    const [season, setSeason] = useState<Season>(Season.TWO_PLUS);

    const shipDefinitions = useMemo(() => getShipDefinitionsForResearchAgreement(season), [season]);
    const userSettings = useMemo<IUserSettings>(() => getCurrentUserSettings(), []);
    const allFilterOptions = useMemo(() => getAllFilterCombinations(), []);
    const allResearchConfigurations = useMemo(() => allFilterOptions.map(filterState => {
        return createResearchConfiguration(filterState, shipDefinitions, userSettings);
    }), [allFilterOptions, shipDefinitions]);

    const shipFilterOptions = useMemo(() => getShipFilterOptions(shipDefinitions, userSettings), [shipDefinitions, userSettings]);

    const [filterState, setFilterState] = useState<IResearchFilterState>({
        shipId: null,
        manufacturerFilter: null,
        strategyTypeFilter: null,
        tacticTypeFilter: null,
    });

    const filteredResearchConfigurations = useMemo(() => getFilteredResearchConfigurations(allResearchConfigurations, filterState), [allResearchConfigurations, filterState]);

    const [configurationForDialog, setConfigurationForDialog] = useState<IResearchConfiguration | null>(null);

    return (
        <>
            <NavigationBar currentRoute="/researchAgreement" />
            <PageContent>
                <Box p={1}>
                    <Stack spacing={1}>
                        <Stack pt={1} pb={1} spacing={2}>
                            <Typography variant="body2">
                                {t('researchAgreement.pageDescription1')}
                            </Typography>
                            <Typography variant="body2">
                                {t('researchAgreement.pageDescription2')}
                            </Typography>
                            <Typography variant="body2">
                                {t('researchAgreement.pageDescription3')}
                            </Typography>
                        </Stack>
                        <Paper>
                            <Box p={2}>
                                <Stack spacing={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="body2">
                                            {t('researchAgreement.environment')}
                                        </Typography>
                                        <div>
                                            <EnvironmentSetting
                                                season={season}
                                                seasonDisabled={filterState.shipId !== null}
                                                onChangeSeason={setSeason}
                                            />
                                        </div>
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Typography variant="body2">
                                            {t('label.researchDirection')}
                                        </Typography>
                                        <div>
                                            <ResearchFilter filterState={filterState} onChange={setFilterState} shipFilterOptions={shipFilterOptions} />
                                        </div>
                                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                            <ViewModeSelection mode={viewMode} onChange={setViewMode} />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Paper>
                        {viewMode === 'ships' && (
                            <MemoizedResearchAgreementShipsView
                                configurations={filteredResearchConfigurations}
                                filterState={filterState}
                            />
                        )}
                    </Stack>
                </Box>
            </PageContent>
            {viewMode === 'table' && (
                <Box p={1}>    
                    <MemoizedResearchAgreementTable
                        configurations={filteredResearchConfigurations}
                        filterState={filterState}
                        onClickConfiguration={setConfigurationForDialog}
                    />
                </Box>
            )}
            {configurationForDialog && (
                <ResponsiveDialog
                    maxWidth="sm"
                    title={(
                        <ConfigurationSummary
                            configuration={configurationForDialog}
                            filterState={filterState}
                        />
                    )}
                    content={(
                        <ConfigurationDetail configuration={configurationForDialog} />
                    )}
                    actions={(
                        <Button variant="outlined" onClick={() => setConfigurationForDialog(null)}>
                            {t('button.close')}
                        </Button>
                    )}
                    onClose={() => setConfigurationForDialog(null)}
                />
            )}
            <PageFooter disableContainer={viewMode === 'table'} />
        </>
    );
};

export default ResearchAgreementPage;
