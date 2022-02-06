import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { ITechFile } from '../../../types/ITechFile';
import { TechFileSelection } from './TechFileSelection';
import { TechFileDetails } from './TechFileDetails';
import { techFiles } from '../../../data/techFiles';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';

export const BoxChancePage = () => {
    const [techFile, setTechFile] = useState<ITechFile>(techFiles[0]);

    return (
        <>
            <NavigationBar currentRoute="/techFiles" />
            <Container>
                <Box p={1}>
                    <Stack spacing={1}>
                        <Paper>
                            <Box p={1}>
                                <TechFileSelection
                                    id="tech-file-selection"
                                    techFile={techFile}
                                    onChange={setTechFile}
                                />
                            </Box>
                        </Paper>
                        <TechFileDetails techFile={techFile} />
                    </Stack>
                </Box>
            </Container>
        </>
    );
};

export default BoxChancePage;
