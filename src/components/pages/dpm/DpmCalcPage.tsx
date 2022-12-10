import { useState, useCallback, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { createWeaponBaseProperties } from './utils/dpmCalcInputUtils';
import { IWeaponBaseProperties, IInputProperty } from './types/IInputProperty';
import { WeaponBasePropertyForm } from './WeaponBasePropertyForm';
import { PageFooter } from '../../pageStructure/PageFooter';
import { useEnhancementTabs } from './hooks/useEnhancementTabs';
import { EnhancementPropertyTabContent } from './EnhancementPropertyTabContent';

export const DpmCalcPage = () => {
    const [weaponBaseProperties, setWeaponBaseProperties] = useState<IWeaponBaseProperties>(() => createWeaponBaseProperties());

    const {
        enhancementTabIndex,
        canAddEnhancementTab,
        enhancementTabs,
        setEnhancementTabIndex,
        addEnhancementTab,
        removeEnhancementTab,
        renameEnhancementTab,
        changeEnhancementProperty,
    } = useEnhancementTabs();

    const handleChangeWeaponBaseProperties = useCallback((newInputProperty: IInputProperty) => {
        setWeaponBaseProperties(properties => ({
            ...properties,
            [newInputProperty.id]: newInputProperty,
        }));
    }, []);

    const handleChangeTab = useCallback((_event: SyntheticEvent, newTabIndex: number) => {
        if (newTabIndex < enhancementTabs.length) {
            setEnhancementTabIndex(newTabIndex);
        }
    }, [enhancementTabs, setEnhancementTabIndex]);

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
                        <Typography variant="body1">
                            {'武装'}
                        </Typography>
                        <Paper>
                            <Box p={1}>
                                <WeaponBasePropertyForm properties={weaponBaseProperties} onChange={handleChangeWeaponBaseProperties} />
                            </Box>
                        </Paper>
                        <Typography variant="body1">
                            {'スキル'}
                        </Typography>
                        <Paper>
                            <Tabs
                                value={enhancementTabIndex}
                                onChange={handleChangeTab}
                                variant="scrollable"
                                scrollButtons="auto"
                                allowScrollButtonsMobile={true}
                            >
                                {enhancementTabs.map((tab, index) => (
                                    <Tab label={(
                                        <Typography variant="body2">
                                            {tab.name || tab.defaultName(index)}
                                        </Typography>
                                    )} key={tab.id} />
                                ))}
                                {canAddEnhancementTab && (
                                    <Tab label={<AddIcon />} onClick={addEnhancementTab} />
                                )}
                            </Tabs>
                            <Box p={1} pt={2}>
                                {enhancementTabs.map((tab, index) => [tab, index] as const).filter(([_tab, index]) => index === enhancementTabIndex).map(([tab, index]) => (
                                    <EnhancementPropertyTabContent
                                        key={tab.id}
                                        tab={tab}
                                        tabIndex={index}
                                        canDelete={enhancementTabs.length > 1}
                                        canRename={enhancementTabs.length > 1}
                                        onChangeProperty={changeEnhancementProperty}
                                        onDeleteTab={removeEnhancementTab}
                                        onRename={renameEnhancementTab}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default DpmCalcPage;
