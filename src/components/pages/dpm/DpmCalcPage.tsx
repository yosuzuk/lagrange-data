import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { FormControl } from './FormControl';
import { createDpmCalcInputProperties } from './utils/dpmCalcInputUtils';
import { IDpmCalcInput, IInputProperty } from './types/IDpmCalcInput';
import { LabeledList } from '../../list/LabeledList';

export const DpmCalcPage = () => {
    const initialState = useRef(() => createDpmCalcInputProperties());
    const [input, setInput] = useState<IDpmCalcInput>(initialState.current);

    const handleChange = useCallback((newInputProperty: IInputProperty) => {
        setInput(input => ({
            ...input,
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
                                <LabeledList
                                    rows={(Object.values(input) as IInputProperty[]).map(inputProperty => ({
                                        key: inputProperty.id,
                                        label: inputProperty.label,
                                        value: (
                                            <FormControl
                                                inputProperty={inputProperty}
                                                onChange={handleChange}
                                            />
                                        ),
                                    }))}
                                />
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
            </PageContent>
        </>
    );
};

export default DpmCalcPage;
