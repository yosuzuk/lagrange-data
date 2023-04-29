import { useState, useCallback, ChangeEventHandler, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        paddingLeft: '6px',
        backgroundColor: '#121212',
    },
    '& .MuiInputAdornment-root': {
        color: 'grey',
        fontSize: '0.9rem',
    },
    '& .MuiInputBase-input': {
        width: '40px',
        padding: '1px',
        fontSize: '0.9rem',
    },
    '& .MuiInputBase-input::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& .MuiInputBase-input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& .MuiInputBase-input[type=number]': {
        MozAppearance: 'textfield',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#5a5a5a',
            borderWidth: '1px',
            borderRadius: 0,
        },
        '&:hover fieldset': {
            borderColor: 'grey',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'grey',
        },
    },
});

interface IProps {
    id: string;
    label: string;
    value: number | null;
}

export const CoordinateInput = (props: IProps) => {
    const { id, label, value: initialValue } = props;

    const [value, setValue] = useState<string>(`${initialValue}`);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
        const value = e.target.value;
        if (`${value}`.length <= 4 && Number(value) >= 0) {
            setValue(value);
        }
    }, []);

    useEffect(() => {
        setValue(initialValue === null ? '' : `${initialValue}`);
    }, [initialValue]);

    return (
        <StyledTextField
            label={null}
            value={value}
            variant="outlined"
            type="number"
            id={id}
            size="small"
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start" disableTypography={true}>
                        {`${label}: `}
                    </InputAdornment>
                ),
            }}
            inputProps={{
                maxLength: 4,
            }}
        />
    );
};
