import { useState, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PageContent } from '../../pageStructure/PageContent';
import { createWeaponBaseProperties, createWeaponEnhancementProperties, createTargetProperties } from './utils/dpmCalcInputUtils';
import { IWeaponBaseProperties, IInputProperty } from './types/IInputProperty';
import { WeaponBasePropertyForm } from './WeaponBasePropertyForm';
import { PageFooter } from '../../pageStructure/PageFooter';
import { usePropertyTabs } from './hooks/usePropertyTabs';
import { PropertyTabs } from './PropertyTabs';
import { INumericOutputProperty, IOutputProperties, OutputPropertyId } from './types/IOutputProperty';
import { createOutputProperties, createOutputPropertiesForTabs, dependsOn } from './utils/dpmCalcOutputUtils';
import { LabeledList } from '../../list/LabeledList';

export const DpmCalcPage = () => {
    const [weaponBaseProperties, setWeaponBaseProperties] = useState<IWeaponBaseProperties>(() => createWeaponBaseProperties());

    const {
        tabIndex: enhancementTabIndex,
        canAddTab: canAddEnhancementTab,
        tabs: enhancementTabs,
        setTabIndex: setEnhancementTabIndex,
        addTab: addEnhancementTab,
        removeTab: removeEnhancementTab,
        renameTab: renameEnhancementTab,
        changeProperty: changeEnhancementProperty,
    } = usePropertyTabs({
        idPrefix: 'enhancementTab',
        tabNamePrefix: 'スキル設定',
        propertyFactoryFn: createWeaponEnhancementProperties,
    });

    const {
        tabIndex: attackTargetTabIndex,
        canAddTab: canAddAttackTargetTab,
        tabs: attackTargetTabs,
        setTabIndex: setAttackTargetTabIndex,
        addTab: addAttackTargetTab,
        removeTab: removeAttackTargetTab,
        renameTab: renameAttackTargetTab,
        changeProperty: changeAttackTargetProperty,
    } = usePropertyTabs({
        idPrefix: 'attackTargetTab',
        tabNamePrefix: '攻撃対象',
        propertyFactoryFn: createTargetProperties,
    });

    const handleChangeWeaponBaseProperties = useCallback((newInputProperty: IInputProperty) => {
        setWeaponBaseProperties(properties => ({
            ...properties,
            [newInputProperty.id]: newInputProperty,
        }));
    }, []);

    const baseOutputProperties = useMemo<Readonly<IOutputProperties>>(() => createOutputProperties(), []);

    const computedOutputProperties = useMemo<Record<string, Record<string, IOutputProperties>>>(() => createOutputPropertiesForTabs({
        weaponBaseProperties,
        enhancementTabs,
        attackTargetTabs,
        baseOutputProperties,
    }), [weaponBaseProperties, enhancementTabs, attackTargetTabs, baseOutputProperties]);

    return (
        <>
            <NavigationBar currentRoute="/dpmCalc" />
            <PageContent>
                <Box p={1}>
                    <Stack pt={1} spacing={4}>
                        <Typography variant="body2">
                            ABC
                        </Typography>
                        <Typography variant="body2">
                            DEF
                        </Typography>
                        <Typography variant="body2">
                            GHI
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'武装'}
                            </Typography>
                            <Paper>
                                <Box p={1}>
                                    <WeaponBasePropertyForm properties={weaponBaseProperties} onChange={handleChangeWeaponBaseProperties} />
                                </Box>
                            </Paper>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'スキル'}
                            </Typography>
                            <Paper>
                                <PropertyTabs
                                    idPrefix="enhancementTab"
                                    tabs={enhancementTabs}
                                    tabIndex={enhancementTabIndex}
                                    canAddTab={canAddEnhancementTab}
                                    addTab={addEnhancementTab}
                                    removeTab={removeEnhancementTab}
                                    renameTab={renameEnhancementTab}
                                    changeProperty={changeEnhancementProperty}
                                    setTabIndex={setEnhancementTabIndex}
                                />
                            </Paper>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'攻撃対象'}
                            </Typography>
                            <Paper>
                                <PropertyTabs
                                    idPrefix="attackTargetTab"
                                    tabs={attackTargetTabs}
                                    tabIndex={attackTargetTabIndex}
                                    canAddTab={canAddAttackTargetTab}
                                    addTab={addAttackTargetTab}
                                    removeTab={removeAttackTargetTab}
                                    renameTab={renameAttackTargetTab}
                                    changeProperty={changeAttackTargetProperty}
                                    setTabIndex={setAttackTargetTabIndex}
                                />
                            </Paper>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                {'計算結果'}
                            </Typography>
                            <Paper>
                                <Box p={1}>
                                    {enhancementTabs.length === 1 && attackTargetTabs.length === 1 && (
                                        <LabeledList
                                            rows={
                                                Object.values(baseOutputProperties)
                                                    .map(baseOutputProperty => ({
                                                        key: baseOutputProperty.id,
                                                        label: baseOutputProperty.label,
                                                        value: (() => {
                                                            const computedProperty = computedOutputProperties[enhancementTabs[0].id]?.[attackTargetTabs[0].id]?.[baseOutputProperty.id as OutputPropertyId] ?? null; 
                                                            if (!computedProperty) {
                                                                return '-';
                                                            }
                                                            if (computedProperty.type === 'numeric') {
                                                                return (computedProperty as INumericOutputProperty).value ?? '-';
                                                            }
                                                            return '?';
                                                        })(),
                                                    }))
                                            }
                                        />
                                    )}
                                    {(enhancementTabs.length > 1 || attackTargetTabs.length > 1) && Object.values(baseOutputProperties).map(baseOutputProperty => {
                                        const dependsOnWeaponEnhancement = dependsOn(baseOutputProperty, 'weaponEnhancementProperties', baseOutputProperties);
                                        const dependsOnTarget = dependsOn(baseOutputProperty, 'targetProperties', baseOutputProperties);
                                        const showColumnsForEnhancement = dependsOnWeaponEnhancement && enhancementTabs.length > 1;
                                        const showRowsForTargets = showColumnsForEnhancement && dependsOnTarget && attackTargetTabs.length > 1;
                                        const showColumnsForTargets = !showColumnsForEnhancement && dependsOnTarget && attackTargetTabs.length > 1;

                                        return (
                                            <Box key={baseOutputProperty.id} pb={6}>
                                                <Typography variant="body1" gutterBottom={true}>{baseOutputProperty.label}</Typography>
                                                {showColumnsForEnhancement && (
                                                    <Box pl={2}>
                                                        <TableContainer component={Paper} sx={{ width: 'fit-content' }}>
                                                            <Table size="small" sx={{ width: 'fit-content' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        {showRowsForTargets && (
                                                                            <TableCell>{''}</TableCell>
                                                                        )}
                                                                        {enhancementTabs.map((enhancementTab, index) => (
                                                                            <TableCell key={enhancementTab.id}>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    {enhancementTab.name || enhancementTab.defaultName(index)}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {(showRowsForTargets ? attackTargetTabs : [attackTargetTabs[0]]).map((attackTargetTab, index) => (
                                                                        <TableRow key={attackTargetTab.id}>
                                                                            {showRowsForTargets && (
                                                                                <TableCell>
                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                        {attackTargetTab.name || attackTargetTab.defaultName(index)}
                                                                                    </Typography>
                                                                                </TableCell>
                                                                            )}
                                                                            {enhancementTabs.map(enhancementTab => (
                                                                                <TableCell key={enhancementTab.id}>
                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                        {(() => {
                                                                                            const computedProperty = computedOutputProperties[enhancementTab.id]?.[attackTargetTab.id]?.[baseOutputProperty.id as OutputPropertyId] ?? null; 
                                                                                            if (!computedProperty) {
                                                                                                return '-';
                                                                                            }
                                                                                            if (computedProperty.type === 'numeric') {
                                                                                                return (computedProperty as INumericOutputProperty).value ?? '-';
                                                                                            }
                                                                                            return '?';
                                                                                        })()}
                                                                                    </Typography>
                                                                                </TableCell>
                                                                            ))}
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Box>
                                                )}
                                                {!showColumnsForEnhancement && showColumnsForTargets && (
                                                    <Box pl={2}>
                                                        <TableContainer component={Paper} sx={{ width: 'fit-content' }}>
                                                            <Table size="small" sx={{ width: 'fit-content' }}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        {attackTargetTabs.map((attackTargetTab, index) => (
                                                                            <TableCell key={attackTargetTab.id}>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    {attackTargetTab.name || attackTargetTab.defaultName(index)}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        {attackTargetTabs.map((attackTargetTab, index) => (
                                                                            <TableCell key={attackTargetTab.id}>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    {(() => {
                                                                                        const computedProperty = computedOutputProperties[enhancementTabs[0].id]?.[attackTargetTab.id]?.[baseOutputProperty.id as OutputPropertyId] ?? null; 
                                                                                        if (!computedProperty) {
                                                                                            return '-';
                                                                                        }
                                                                                        if (computedProperty.type === 'numeric') {
                                                                                            return (computedProperty as INumericOutputProperty).value ?? '-';
                                                                                        }
                                                                                        return '?';
                                                                                    })()}
                                                                                </Typography>
                                                                            </TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Box>
                                                )}
                                                {!showColumnsForEnhancement && !showColumnsForTargets && (
                                                    <Box pl={2}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {(() => {
                                                                const computedProperty = computedOutputProperties[enhancementTabs[0].id]?.[attackTargetTabs[0].id]?.[baseOutputProperty.id as OutputPropertyId] ?? null; 
                                                                if (!computedProperty) {
                                                                    return '-';
                                                                }
                                                                if (computedProperty.type === 'numeric') {
                                                                    return (computedProperty as INumericOutputProperty).value ?? '-';
                                                                }
                                                                return '?';
                                                            })()}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Paper>
                        </Stack>
                    </Stack>
                </Box>
            </PageContent>
            <PageFooter />
        </>
    );
};

export default DpmCalcPage;
