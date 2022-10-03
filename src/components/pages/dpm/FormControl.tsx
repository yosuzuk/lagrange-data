import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ChangeEvent } from 'react';
import { IInputProperty, INumericInputProperty, ISelectInputProperty } from './types/IDpmCalcInput';
import { getAdornmentForUnit, applyPropertyChange } from './utils/dpmCalcInputUtils';

interface IProps {
    inputProperty: IInputProperty;
    onChange: (inputProperty: IInputProperty) => void;
}

export const FormControl = (props: IProps) => {
    const { inputProperty, onChange } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (inputProperty.type) {
            case 'numeric': {
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
                    />
                    {inputProperty.description && (
                        <Typography variant="body2" color="text.secondary">{inputProperty.description}</Typography>
                    )}
                </>
            );
        }
        case 'select': {
            const { value, options } = inputProperty as ISelectInputProperty;
            return (
                <TextField
                    id={inputProperty.id}
                    size="small"
                    select={true}
                    value={value}
                    helperText={inputProperty.description}
                    onChange={handleChange}
                >
                    {options.map(option => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            );
        }
        default: {
            throw new Error(`Unsupported input property type "${inputProperty.type}"`);
        }
    }
};
