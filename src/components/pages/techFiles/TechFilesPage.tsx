import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ITechFile } from '../../../types/ITechFile';
import { TechFileSelection } from './TechFileSelection';
import { TechFileDetails } from './TechFileDetails';
import { techFiles } from '../../../data/techFiles';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { t } from '../../../i18n';
import { routes } from '../../../utils/routes';

export const BoxChancePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialId = searchParams.get('id');
    const initialTechFile = initialId ? techFiles.find(f => f.id === initialId) ?? techFiles[0] : techFiles[0];

    const [techFile, setTechFile] = useState<ITechFile>(initialTechFile);

    useEffect(() => {
        setSearchParams(routes.techFiles.createSearchParams({
            id: techFile.id,
        }));
    }, [techFile]);

    return (
        <>
            <NavigationBar currentRoute="/techFiles" />
            <PageContent>
                <Box component="div" p={1}>
                    <Stack pt={1} pb={2} spacing={2}>
                        <Typography variant="body2">
                            {t('techFiles.pageDescription1')}
                        </Typography>
                        <Typography variant="body2">
                            {t('techFiles.pageDescription2')}
                        </Typography>
                        <Typography variant="body2">
                            {t('techFiles.pageDescription3')}
                        </Typography>
                    </Stack>
                    <Stack spacing={1}>
                        <Paper>
                            <Box component="div" p={1}>
                                <TechFileSelection
                                    id="tech-file-selection"
                                    techFile={techFile}
                                    onChange={setTechFile}
                                />
                            </Box>
                        </Paper>
                        <TechFileDetails techFile={techFile} />
                        <Typography variant="caption" align="right" paragraph={true}>
                            {t('techFiles.pageFootnote')}
                        </Typography>
                    </Stack>
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default BoxChancePage;
