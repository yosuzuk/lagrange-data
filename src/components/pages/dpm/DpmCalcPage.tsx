import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { createDpmCalcBaseProperties, createDpmCalcEnhancementProperties } from './utils/dpmCalcInputUtils';
import { IDpmCalcBaseProperties, IDpmCalcEnhancementProperties, IInputProperty } from './types/IDpmCalcInput';
import { BasePropertyForm } from './BasePropertyForm';
import { EnhancementPropertyForm } from './EnhancementPropertyForm';
import { PageFooter } from '../../pageStructure/PageFooter';

export const DpmCalcPage = () => {
    const [baseProperties, setBaseProperties] = useState<IDpmCalcBaseProperties>(() => createDpmCalcBaseProperties());
    const [enhancementSettings, setEnhancementSettings] = useState<IDpmCalcEnhancementProperties[]>(() => [
        createDpmCalcEnhancementProperties(),
    ]);

    const handleChangeBaseProperties = useCallback((newInputProperty: IInputProperty) => {
        setBaseProperties(properties => ({
            ...properties,
            [newInputProperty.id]: newInputProperty,
        }));
    }, []);

    const handleChangeEnhancementProperties = useCallback((newInputProperty: IInputProperty, settingIndex: number) => {
        setEnhancementSettings(settings => {
            return settings.map((properties: IDpmCalcEnhancementProperties, index: number) => index !== settingIndex ? properties : ({
                ...properties,
                [newInputProperty.id]: newInputProperty,
            }));
        });
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
                        {enhancementSettings.map((enhancementProperties: IDpmCalcEnhancementProperties, index: number) => (
                            <Paper key={`enhancementProperties${index}`}>
                                <Box p={1}>
                                    <EnhancementPropertyForm settingIndex={index} properties={enhancementProperties} onChange={handleChangeEnhancementProperties} />
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default DpmCalcPage;
