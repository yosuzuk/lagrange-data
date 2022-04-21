import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { IModuleSelection, ReinforcementType, IModuleUsage } from './types/IFleetSetup';
import { applyUsageForModule } from './utils/fleetSetupUtils';

export interface IProps {
    shipId: string;
    reinforcement: ReinforcementType | null;
    moduleSelection: IModuleSelection;
    onChange: (shipId: string, reinforcement: ReinforcementType | null, moduleSelection: IModuleSelection) => void;
    onClose: () => void;
}

export const ModuleSelectionDialog = (props: IProps) => {
    const { shipId, reinforcement, moduleSelection, onChange, onClose } = props;

    const [newModuleSelection, setNewModuleSelection] = useState<IModuleSelection>(moduleSelection);

    const handleClickApply = () => {
        onChange(shipId, reinforcement, newModuleSelection);
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [groupId, moduleId] = (event.target as HTMLInputElement).value.split('#');
        setNewModuleSelection(newModuleSelection => applyUsageForModule(groupId, moduleId, newModuleSelection));
    };

    const getCurrentValue = (groupId: string): string | null => {
        const usedModuleId = Object.keys(newModuleSelection.groups[groupId]).find(moduleId => {
            return newModuleSelection.groups[groupId][moduleId].usage === 'used';
        });
        return usedModuleId ? `${groupId}#${usedModuleId}` : null;
    };

    const needEmptyOption = (groupId: string): boolean => {
        return !Object.keys(newModuleSelection.groups[groupId]).find(moduleId => {
            return newModuleSelection.groups[groupId][moduleId].module.defaultModule;
        });
    }

    return (
        <ResponsiveDialog
            title={'システムを換装'}
            content={(
                <Stack spacing={3}>
                    {Object.keys(newModuleSelection.groups).map(groupId => {
                        const currentValue = getCurrentValue(groupId);
                        const valueForEmptyOption = `${groupId}#none`;
                        return (
                            <Paper variant="outlined" key={groupId}>
                                <Box pl={1} pr={1}>
                                    <FormControl>
                                        <RadioGroup
                                            defaultValue="female"
                                            name={`group-${groupId}`}
                                            value={currentValue ?? valueForEmptyOption}
                                            onChange={handleChange}
                                        >
                                            {needEmptyOption(groupId) && (
                                                <FormControlLabel
                                                    key={valueForEmptyOption}
                                                    label={'無し'}
                                                    value={valueForEmptyOption}
                                                    control={<Radio />}
                                                />
                                            )}
                                            {Object.keys(newModuleSelection.groups[groupId]).map((moduleId: string) => {
                                                const moduleUsage: IModuleUsage = newModuleSelection.groups[groupId][moduleId];
                                                const disabled = reinforcement !== 'ally' && reinforcement !== 'ally2' && reinforcement !== 'ally3' && moduleUsage.usage === 'not_possessed';
                                                const value = `${groupId}#${moduleId}`;
                                                return (
                                                    <FormControlLabel
                                                        key={moduleId}
                                                        label={`${moduleUsage.module.category}${moduleUsage.module.categoryNumber} ${moduleUsage.module.name}`}
                                                        value={value}
                                                        control={<Radio disabled={disabled} />}
                                                        disabled={disabled}
                                                    />
                                                );
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Paper>
                        );
                    })}
                </Stack>
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onClose}>
                        {'キャンセル'}
                    </Button>
                    <Button variant="contained" onClick={handleClickApply}>
                        {'ＯＫ'}
                    </Button>
                </>
            )}
            onClose={onClose}
        />
    );
};
