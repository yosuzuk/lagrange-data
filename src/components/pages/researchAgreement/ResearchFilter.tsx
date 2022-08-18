import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IResearchFilterState, IShipFilterOptions } from './types/IResearchConfiguration';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';
import { getShipName } from '../../../utils/shipDefinitionUtils';
import { isLanguageWithWhitespace, t } from '../../../i18n';

interface IProps {
    filterState: IResearchFilterState;
    shipFilterOptions: IShipFilterOptions;
    onChange: (filterState: IResearchFilterState) => void;
}

export const ResearchFilter = (props: IProps) => {
    const { filterState, shipFilterOptions, onChange } = props;

    const handleChangeShipId = (event: SelectChangeEvent) => {
        onChange({
            ...filterState,
            shipId: event.target.value === '' ? null : event.target.value,
            manufacturerFilter: null,
            strategyTypeFilter: null,
            tacticTypeFilter: null,
        });
    };

    const handleChangeManufacturer = (event: SelectChangeEvent) => {
        onChange({
            ...filterState,
            shipId: null,
            manufacturerFilter: event.target.value === '' ? null : event.target.value as ResearchManufacturer,
        });
    };

    const handleChangeStrategyType = (event: SelectChangeEvent) => {
        onChange({
            ...filterState,
            shipId: null,
            strategyTypeFilter: event.target.value === '' ? null : event.target.value as ResearchStrategyType,
        });
    };

    const handleChangeTacticsType = (event: SelectChangeEvent) => {
        onChange({
            ...filterState,
            shipId: null,
            tacticTypeFilter: event.target.value === '' ? null : event.target.value as ResearchTacticType,
        });
    };

    const handleClickReset = () => {
        onChange({
            ...filterState,
            shipId: null,
            manufacturerFilter: null,
            strategyTypeFilter: null,
            tacticTypeFilter: null,
        });
    };

    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} xs={12} sm={8} md={4}>
                <FormControl fullWidth={true} size="small">
                    <InputLabel id="manufacturer-select-label">{t('label.researchManufacturer')}</InputLabel>
                    <Select
                        labelId="manufacturer-select-label"
                        value={filterState.manufacturerFilter ?? ''}
                        label={t('label.researchManufacturer')}
                        onChange={handleChangeManufacturer}
                    >
                        <MenuItem value="">{t('label.notSelected')}</MenuItem>
                        <Divider />
                        {Object.values(ResearchManufacturer).map(manufacturer => (
                            <MenuItem key={manufacturer} value={manufacturer}>{translateResearchManufacturer(manufacturer)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item={true} xs={12} sm={8} md={4}>
                <FormControl fullWidth={true} size="small">
                    <InputLabel id="strategy-select-label">{t('label.researchStrategyType')}</InputLabel>
                    <Select
                        labelId="strategy-select-label"
                        value={filterState.strategyTypeFilter ?? ''}
                        label={t('label.researchStrategyType')}
                        onChange={handleChangeStrategyType}
                    >
                        <MenuItem value="">{t('label.notSelected')}</MenuItem>
                        <Divider />
                        {Object.values(ResearchStrategyType).map(strategyType => (
                            <MenuItem key={strategyType} value={strategyType}>{translateResearchStrategyType(strategyType)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item={true} xs={12} sm={8} md={4}>
                <FormControl fullWidth={true} size="small">
                    <InputLabel id="tactics-select-label">{t('label.researchTacticType')}</InputLabel>
                    <Select
                        labelId="tactics-select-label"
                        value={filterState.tacticTypeFilter ?? ''}
                        label={t('label.researchTacticType')}
                        onChange={handleChangeTacticsType}
                    >
                        <MenuItem value="">{t('label.notSelected')}</MenuItem>
                        <Divider />
                        {Object.values(ResearchTacticType).map(tacticsType => (
                            <MenuItem key={tacticsType} value={tacticsType}>{translateResearchTacticType(tacticsType)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item={true} xs={12} sm={8}>
                <FormControl fullWidth={true} size="small">
                    <InputLabel id="ship-select-label">
                        {t('label.ship')}
                    </InputLabel>
                    <Select
                        labelId="ship-select-label"
                        value={filterState.shipId ?? ''}
                        label={t('label.ship')}
                        onChange={handleChangeShipId}
                    >
                        <MenuItem value="">{t('label.notSelected')}</MenuItem>
                        {(shipFilterOptions.wantedShips.length + shipFilterOptions.shipsWithWantedModule.length) > 0 && (
                            <Divider />
                        )}
                        {(shipFilterOptions.wantedShips.length + shipFilterOptions.shipsWithWantedModule.length) > 0 && (
                            <ListSubheader disableSticky={true}>
                                {t('label.wantedBlueprintColon')}
                            </ListSubheader>
                        )}
                        {shipFilterOptions.wantedShips.map(ship => (
                            <MenuItem key={ship.id} value={ship.id}>
                                {getShipName(ship)}
                                <Typography variant="body1" component="span" sx={{ color: '#ffc107', marginLeft: '4px' }}>
                                    {'★'}
                                </Typography>
                            </MenuItem>
                        ))}
                        {shipFilterOptions.shipsWithWantedModule.map(({ shipDefinition, modules }) => (
                            <MenuItem key={shipDefinition.id} value={shipDefinition.id}>
                                {getShipName(shipDefinition)}
                                {isLanguageWithWhitespace() && (
                                    <span>&nbsp;</span>
                                )}
                                {t('label.additionalSystemModuleBrackets')}
                                <Typography variant="body1" component="span" sx={{ color: '#ffc107', marginLeft: '4px' }}>
                                    {'★'}
                                </Typography>
                            </MenuItem>
                        ))}
                        {shipFilterOptions.remainingShips.length > 0 && (
                            <Divider />
                        )}
                        {shipFilterOptions.remainingShips.length > 0 && (
                            <ListSubheader disableSticky={true}>
                                {t('label.acquirableBlueprintColon')}
                            </ListSubheader>
                        )}
                        {shipFilterOptions.remainingShips.map(ship => (
                            <MenuItem key={ship.id} value={ship.id}>{getShipName(ship)}</MenuItem>
                        ))}
                        {shipFilterOptions.possessedShips.length > 0 && (
                            <Divider />
                        )}
                        {shipFilterOptions.possessedShips.length > 0 && (
                            <ListSubheader disableSticky={true}>
                                {t('label.acquiredBlueprintColon')}
                            </ListSubheader>
                        )}
                        {shipFilterOptions.possessedShips.map(ship => (
                            <MenuItem key={ship.id} value={ship.id}>{getShipName(ship)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item={true} xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" onClick={handleClickReset}>{t('button.reset')}</Button>
            </Grid>
        </Grid>
    );
}
