import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IResearchFilterState } from './types/IResearchConfiguration';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { translateResearchManufacturer } from '../../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../../utils/researchTacticTypeUtils';

interface IProps {
    filterState: IResearchFilterState;
    onChange: (filterState: IResearchFilterState) => void;
}

export const ResearchFilter = (props: IProps) => {
    const { filterState, onChange } = props;

    const theme = useTheme();
    const downSm = useMediaQuery(theme.breakpoints.down('sm'));
    const downMd = useMediaQuery(theme.breakpoints.down('md'));

    const handleChangeManufacturer = (event: SelectChangeEvent) => {
        onChange({
            ...filterState,
            manufacturerFilter: event.target.value === 'none' ? null : event.target.value as ResearchManufacturer,
        });
    };

    const handleChangeStrategyType = (event: SelectChangeEvent) => {
        onChange({
            ...filterState,
            strategyTypeFilter: event.target.value === 'none' ? null : event.target.value as ResearchStrategyType,
        });
    };

    const handleChangeTacticsType = (event: SelectChangeEvent) => {
        onChange({
            ...filterState,
            tacticTypeFilter: event.target.value === 'none' ? null : event.target.value as ResearchTacticType,
        });
    };

    const formControlProps = {
        fullWidth: downSm,
        sx: downSm ? undefined : { minWidth: '250px' },
    };

    return (
        <Stack spacing={2} direction={downMd ? 'column' : 'row'}>
            <div>
                <FormControl {...formControlProps}>
                    <InputLabel id="manufacturer-select-label">{'委託企業'}</InputLabel>
                    <Select
                        labelId="manufacturer-select-label"
                        value={filterState.manufacturerFilter ?? 'none'}
                        label="委託企業"
                        onChange={handleChangeManufacturer}
                    >
                        <MenuItem value="none">{'未定義'}</MenuItem>
                        {Object.values(ResearchManufacturer).map(manufacturer => (
                            <MenuItem key={manufacturer} value={manufacturer}>{translateResearchManufacturer(manufacturer)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl {...formControlProps}>
                    <InputLabel id="strategy-select-label">{'戦略能力'}</InputLabel>
                    <Select
                        labelId="strategy-select-label"
                        value={filterState.strategyTypeFilter ?? 'none'}
                        label="戦略能力"
                        onChange={handleChangeStrategyType}
                    >
                        <MenuItem value="none">{'未定義'}</MenuItem>
                        {Object.values(ResearchStrategyType).map(strategyType => (
                            <MenuItem key={strategyType} value={strategyType}>{translateResearchStrategyType(strategyType)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl {...formControlProps}>
                    <InputLabel id="tactics-select-label">{'戦術性能'}</InputLabel>
                    <Select
                        labelId="tactics-select-label"
                        value={filterState.tacticTypeFilter ?? 'none'}
                        label="戦術性能"
                        onChange={handleChangeTacticsType}
                    >
                        <MenuItem value="none">{'未定義'}</MenuItem>
                        {Object.values(ResearchTacticType).map(tacticsType => (
                            <MenuItem key={tacticsType} value={tacticsType}>{translateResearchTacticType(tacticsType)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </Stack>
    );
}
