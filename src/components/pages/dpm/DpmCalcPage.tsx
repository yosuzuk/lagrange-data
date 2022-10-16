import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { FormControl } from './FormControl';
import { createDpmCalcBaseProperties, createDpmCalcEnhancementProperties, isVisibleBaseProperty } from './utils/dpmCalcInputUtils';
import { IDpmCalcBaseProperties, IDpmCalcEnhancementProperties, IInputProperty } from './types/IDpmCalcInput';
import { LabeledList } from '../../list/LabeledList';
import { BasePropertyForm } from './BasePropertyForm';
import { EnhancementPropertyForm } from './EnhancementPropertyForm';

export const DpmCalcPage = () => {
    const initialBaseProperties = useRef(() => createDpmCalcBaseProperties());
    const initialEnhancementProperties = useRef(() => createDpmCalcEnhancementProperties());
    const [baseProperties, setBaseProperties] = useState<IDpmCalcBaseProperties>(initialBaseProperties.current);
    const [enhancementProperties, setEnhancementProperties] = useState<IDpmCalcEnhancementProperties>(initialEnhancementProperties.current);

    const handleChangeBaseProperties = useCallback((newInputProperty: IInputProperty) => {
        setBaseProperties(properties => ({
            ...properties,
            [newInputProperty.id]: newInputProperty,
        }));
    }, []);

    const handleChangeEnhancementProperties = useCallback((newInputProperty: IInputProperty) => {
        setEnhancementProperties(properties => ({
            ...properties,
            [newInputProperty.id]: newInputProperty,
        }));
    }, []);

    return (
        <>
            <NavigationBar currentRoute="/dpmCalc" />
            <PageContent>
                <Box p={1}>
                    <Stack pt={1} spacing={2}>
                        <Typography variant="body2">
                            ABC
                        </Typography>
                        <Typography variant="body2">
                            DEF
                        </Typography>
                        <Typography variant="body2">
                            GHI
                        </Typography>
                        <Paper>
                            <Box p={1}>
                                <BasePropertyForm properties={baseProperties} onChange={handleChangeBaseProperties} />
                            </Box>
                        </Paper>
                        <Paper>
                            <Box p={1}>
                                <EnhancementPropertyForm properties={enhancementProperties} onChange={handleChangeEnhancementProperties} />
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
            </PageContent>
        </>
    );
};

export default DpmCalcPage;
