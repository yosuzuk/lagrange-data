import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IWeaponBaseProperties, IWeaponEnhancementProperties, ITargetProperties, IShipProperties } from './types/IInputProperty';
import { IOutputProperties, OutputPropertyId } from './types/IOutputProperty';
import { createOutputProperties, createOutputPropertiesForTabs, dependsOn } from './utils/dpmCalcOutputUtils';
import { LabeledList } from '../../list/LabeledList';
import { ComputedProperty } from './ComputedProperty';
import { IPropertyTab } from './types/ITab';

interface IProps {
    shipProperties: IShipProperties;
    weaponBaseProperties: IWeaponBaseProperties;
    enhancementTabs: IPropertyTab<IWeaponEnhancementProperties>[];
    attackTargetTabs: IPropertyTab<ITargetProperties>[];
}

export const ComputedProperties = (props: IProps) => {
    const {
        shipProperties,
        weaponBaseProperties,
        enhancementTabs,
        attackTargetTabs,
    } = props;

    const baseOutputProperties = useMemo<Readonly<IOutputProperties>>(() => createOutputProperties(), []);

    const computedOutputProperties = useMemo<Record<string, Record<string, IOutputProperties>>>(() => createOutputPropertiesForTabs({
        shipProperties,
        weaponBaseProperties,
        enhancementTabs,
        attackTargetTabs,
        baseOutputProperties,
    }), [shipProperties, weaponBaseProperties, enhancementTabs, attackTargetTabs, baseOutputProperties]);

    return (
        <>
            {enhancementTabs.length === 1 && attackTargetTabs.length === 1 && (
                <LabeledList
                    rows={
                        Object.values(baseOutputProperties)
                            .filter(baseOutputProperty => baseOutputProperty.hidden !== true)
                            .map(baseOutputProperty => ({
                                key: baseOutputProperty.id,
                                label: baseOutputProperty.label,
                                value: (
                                    <ComputedProperty
                                        property={computedOutputProperties[enhancementTabs[0].id]?.[attackTargetTabs[0].id]?.[baseOutputProperty.id as OutputPropertyId] ?? null}
                                    />
                                ),
                            }))
                    }
                />
            )}
            {(enhancementTabs.length > 1 || attackTargetTabs.length > 1) && Object.values(baseOutputProperties).filter(baseOutputProperty => baseOutputProperty.hidden !== true).map(baseOutputProperty => {
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
                                                            <ComputedProperty
                                                                property={computedOutputProperties[enhancementTab.id]?.[attackTargetTab.id]?.[baseOutputProperty.id as OutputPropertyId] ?? null}
                                                            />
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
                                                {attackTargetTabs.map(attackTargetTab => (
                                                    <TableCell key={attackTargetTab.id}>
                                                        <ComputedProperty
                                                            property={computedOutputProperties[enhancementTabs[0].id]?.[attackTargetTab.id]?.[baseOutputProperty.id as OutputPropertyId] ?? null}
                                                        />
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
                                <ComputedProperty
                                    property={computedOutputProperties[enhancementTabs[0].id]?.[attackTargetTabs[0].id]?.[baseOutputProperty.id as OutputPropertyId] ?? null}
                                />
                            </Box>
                        )}
                    </Box>
                );
            })}
        </>
    );
};
