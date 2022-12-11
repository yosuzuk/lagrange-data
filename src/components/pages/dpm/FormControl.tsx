import { ChangeEvent, useState, useEffect, useTransition } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { IInputProperty, INumericInputProperty, ISelectInputProperty } from './types/IInputProperty';
import { applyPropertyChange } from './utils/dpmCalcInputUtils';
import { HelpPopper } from './HelpPopper';
import { getAdornmentForUnit } from './utils/unitAdornmentUtils';

const DEFAULT_NUMERIC_INPUT_WIDTH = '8em';
const DEFAULT_SELECT_WIDTH = '15em';

interface IProps {
    inputProperty: IInputProperty;
    onChange: (inputProperty: IInputProperty) => void;
    width?: string;
}

export const FormControl = (props: IProps) => {
    const { inputProperty, onChange, width } = props;
    const [localProperty, setLocalProperty] = useState<IInputProperty>(inputProperty);
    const [_isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            if (localProperty !== inputProperty) {
                onChange(localProperty);
            }
        });
    }, [localProperty, inputProperty, onChange]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (localProperty.type) {
            case 'numeric': {
                if (e.target.value === '') {
                    setLocalProperty(applyPropertyChange(null, localProperty));
                    return;
                }

                const value = Number(e.target.value);
                const numberValue = Number.isFinite(value) ? value as number : null;
                setLocalProperty(applyPropertyChange(numberValue, localProperty));
                break;
            }
            case 'select': {
                setLocalProperty(applyPropertyChange(e.target.value, localProperty));
                break;
            }
            default: {
                throw new Error(`Unsupported input property type "${localProperty.type}"`);
            }
        }
    };

    switch (localProperty.type) {
        case 'numeric': {
            const { value, unit, min, max } = localProperty as INumericInputProperty;
            return (
                <>
                    <Stack direction="row">
                        <Box sx={{ width: width ?? DEFAULT_NUMERIC_INPUT_WIDTH }}>
                            <TextField
                                id={localProperty.id}
                                size="small"
                                required={true}
                                type="number"
                                value={value ?? ''}
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
                        {localProperty.description && (
                            <HelpPopper
                                title={localProperty.label}
                                text={localProperty.description}
                            />
                        )}
                    </Stack>
                </>
            );
        }
        case 'select': {
            const { value, options } = localProperty as ISelectInputProperty;
            return (
                <>
                    <Stack direction="row">
                        <Box sx={{ width: width ?? DEFAULT_SELECT_WIDTH }}>
                            <TextField
                                id={localProperty.id}
                                size="small"
                                select={true}
                                value={value}
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
                        {localProperty.description && (
                            <HelpPopper
                                title={localProperty.label}
                                text={localProperty.description}
                            />
                        )}
                    </Stack>
                </>
            );
        }
        default: {
            throw new Error(`Unsupported input property type "${localProperty.type}"`);
        }
    }
};
