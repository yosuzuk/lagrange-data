import { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IInputProperty, INumericInputProperty, ISelectInputProperty } from './types/IDpmCalcInput';
import { getAdornmentForUnit, applyPropertyChange } from './utils/dpmCalcInputUtils';
import { HelpPopper } from './HelpPopper';

const DEFAULT_NUMERIC_INPUT_WIDTH = '8em';
const DEFAULT_SELECT_WIDTH = '15em';

interface IProps {
    inputProperty: IInputProperty;
    onChange: (inputProperty: IInputProperty) => void;
    width?: string;
}

export const FormControl = (props: IProps) => {
    const { inputProperty, onChange, width } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (inputProperty.type) {
            case 'numeric': {
                if (e.target.value === '') {
                    onChange(applyPropertyChange(null, inputProperty));
                    return;
                }

                const value = Number(e.target.value);
                const numberValue = Number.isFinite(value) ? value as number : null;
                onChange(applyPropertyChange(numberValue, inputProperty));
                break;
            }
            case 'select': {
                onChange(applyPropertyChange(e.target.value, inputProperty));
                break;
            }
            default: {
                throw new Error(`Unsupported input property type "${inputProperty.type}"`);
            }
        }
    };

    switch (inputProperty.type) {
        case 'numeric': {
            const { value, unit, min, max } = inputProperty as INumericInputProperty;
            return (
                <>
                    <Stack direction="row">
                        <Box sx={{ width: width ?? DEFAULT_NUMERIC_INPUT_WIDTH }}>
                            <TextField
                                id={inputProperty.id}
                                size="small"
                                required={true}
                                type="number"
                                value={value ?? undefined}
                                InputProps={{
                                    endAdornment: unit ? <InputAdornment position="end">{getAdornmentForUnit(unit)}</InputAdornment> : undefined,
                                    inputProps: {
                                        min,
                                        max,
                                    },
                                }}
                                onChange={handleChange}
                                fullWidth={true}
                            />
                        </Box>
                        {inputProperty.description && (
                            <HelpPopper
                                title={inputProperty.label}
                                text={inputProperty.description}
                            />
                        )}
                    </Stack>
                </>
            );
        }
        case 'select': {
            const { value, options } = inputProperty as ISelectInputProperty;
            return (
                <>
                    <Stack direction="row">
                        <Box sx={{ width: width ?? DEFAULT_SELECT_WIDTH }}>
                            <TextField
                                id={inputProperty.id}
                                size="small"
                                select={true}
                                value={value}
                                helperText={inputProperty.description}
                                onChange={handleChange}
                                fullWidth={true}
                            >
                                {options.map(option => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        {inputProperty.description && (
                            <HelpPopper
                                title={inputProperty.label}
                                text={inputProperty.description}
                            />
                        )}
                    </Stack>
                </>
            );
        }
        default: {
            throw new Error(`Unsupported input property type "${inputProperty.type}"`);
        }
    }
};
