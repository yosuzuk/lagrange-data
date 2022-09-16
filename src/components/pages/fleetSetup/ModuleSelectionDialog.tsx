import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ResponsiveDialog } from '../../dialog/ResponsiveDialog';
import { IModuleSelection, ReinforcementType, IModuleUsage } from './types/IFleetSetup';
import { applyUsageForModule } from './utils/fleetSetupUtils';
import { isPossessingModule } from '../../../userSettings/utils/userSettingsUtils';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';
import { getModuleName } from '../../../utils/shipDefinitionUtils';
import { t } from '../../../i18n';

export interface IProps {
    shipId: string;
    reinforcement: ReinforcementType | null;
    moduleSelection: IModuleSelection;
    myListOnly: boolean;
    onChange: (shipId: string, reinforcement: ReinforcementType | null, moduleSelection: IModuleSelection) => void;
    onClose: () => void;
}

export const ModuleSelectionDialog = (props: IProps) => {
    const { shipId, reinforcement, moduleSelection, myListOnly, onChange, onClose } = props;
    const { userSettings } = useUserSettings();

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
            title={t('fleetSetup.configureModules')}
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
                                                    label={`${t('label.notSelected')}`}
                                                    value={valueForEmptyOption}
                                                    control={<Radio />}
                                                />
                                            )}
                                            {Object.keys(newModuleSelection.groups[groupId]).map((moduleId: string) => {
                                                const moduleUsage: IModuleUsage = newModuleSelection.groups[groupId][moduleId];

                                                const disabled = reinforcement !== 'ally'
                                                    && reinforcement !== 'ally2'
                                                    && reinforcement !== 'ally3'
                                                    && myListOnly
                                                    && !moduleUsage.module.defaultModule
                                                    && !isPossessingModule(moduleId, shipId, userSettings);

                                                const value = `${groupId}#${moduleId}`;
                                                return (
                                                    <FormControlLabel
                                                        key={moduleId}
                                                        label={(
                                                            <Box pt={1} pb={1}>
                                                                <Typography variant="body1">{`${moduleUsage.module.category}${moduleUsage.module.categoryNumber} ${getModuleName(shipId, moduleUsage.module)}`}</Typography>
                                                                {moduleUsage.module.description && (
                                                                    <Typography variant="body2" color="text.secondary">{`${moduleUsage.module.description}`}</Typography>
                                                                )}
                                                            </Box>
                                                        )}
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
                    {myListOnly && (
                        <Typography variant="caption" paragraph={true}>
                            {t('fleetSetup.configureModulesFootnote')}
                        </Typography>
                    )}
                </Stack>
            )}
            actions={(
                <>
                    <Button variant="outlined" onClick={onClose}>
                        {t('button.cancel')}
                    </Button>
                    <Button variant="contained" onClick={handleClickApply}>
                        {t('button.confirm')}
                    </Button>
                </>
            )}
            onClose={onClose}
        />
    );
};
