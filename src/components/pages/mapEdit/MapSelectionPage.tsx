import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { ExpandStack } from '../../expandStack.tsx/ExpandStack';
import { LoadMapFromUrl } from './LoadMapFromUrl';
import { routes } from '../../../utils/routes';
import { PageFooter } from '../../pageStructure/PageFooter';
import { useMemo } from 'react';
import { getExampleMaps, getPhaseOneServerResultMaps, getNonPhaseOneServerResultMaps, getTemplateMaps } from './examples/examplesMaps';
import { ScriptedLink } from '../../link/ScriptedLink';
import { t } from '../../../i18n';
import { flags } from '../../../utils/flags';

const MapSelectionPage = () => {
    const navigate = useNavigate();

    const navigateToMap = (mapUrl: string) => {
        navigate(routes.mapSelected.createPath({
            d: window.btoa(mapUrl),
        }));
    };

    const examples = useMemo(() => Object.values(getExampleMaps()), []);
    const templates = useMemo(() => getTemplateMaps(), []);
    const serverResultsPhaseOne = useMemo(() => {
        return flags.serverResult ? Object.values(getPhaseOneServerResultMaps()).reverse() : [];
    }, []);
    const serverResultsPhaseN = useMemo(() => {
        return flags.serverResult ? Object.values(getNonPhaseOneServerResultMaps()).reverse() : [];
    }, []);

    return (
        <>
            <NavigationBar currentRoute={routes.map.path} />
            <PageContent>
                <Box component="div" p={1}>
                    <Stack pt={1} pb={2} spacing={2}>
                        <Typography variant="body2">
                            {t('mapEdit.pageDescription1')}
                        </Typography>
                        <Typography variant="body2">
                            {t('mapEdit.pageDescription2')}
                        </Typography>
                    </Stack>
                    <ExpandStack
                        expandables={[
                            {
                                id: 'load',
                                summary: t('mapEdit.openExternalMap'),
                                details: (
                                    <LoadMapFromUrl />
                                ),
                                initiallyOpened: false,
                            },
                            {
                                id: 'examples',
                                summary: t('mapEdit.openExampleMap'),
                                details: (
                                    <Stack spacing={1}>
                                        {examples.map(example => (
                                            <ScriptedLink key={example.url} onClick={() => navigateToMap(example.url)}>
                                                {example.name}
                                            </ScriptedLink>
                                        ))}
                                    </Stack>
                                ),
                                initiallyOpened: false,
                            },
                            {
                                id: 'empty',
                                summary: t('mapEdit.openEmptyMap'),
                                details: (
                                    <Stack spacing={1}>
                                        {templates.map(template => (
                                            <ScriptedLink key={template.url} onClick={() => navigateToMap(template.url)}>
                                                {template.name}
                                            </ScriptedLink>
                                        ))}
                                        <Typography variant="body2" color="text.secondary">{t('mapEdit.sizeCanBeAdjustedBrackets')}</Typography>
                                    </Stack>
                                ),
                                initiallyOpened: false,
                            },
                            ...(flags.serverResult ? [
                                {
                                    id: 'serverResultsPhaseOne',
                                    summary: t('mapEdit.openServerResultMapOne'),
                                    details: (
                                        <Stack spacing={1}>
                                            {serverResultsPhaseOne.map(serverResult => (
                                                <ScriptedLink key={serverResult.url} onClick={() => navigateToMap(serverResult.url)}>
                                                    {serverResult.name}
                                                </ScriptedLink>
                                            ))}
                                        </Stack>
                                    ),
                                    initiallyOpened: false,
                                },
                                {
                                    id: 'serverResultsPhaseN',
                                    summary: t('mapEdit.openServerResultMapN'),
                                    details: (
                                        <Stack spacing={1}>
                                            {serverResultsPhaseN.map(serverResult => (
                                                <ScriptedLink key={serverResult.url} onClick={() => navigateToMap(serverResult.url)}>
                                                    {serverResult.name}
                                                </ScriptedLink>
                                            ))}
                                        </Stack>
                                    ),
                                    initiallyOpened: false,
                                },
                            ] : []),
                        ]}
                    />
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default MapSelectionPage;
