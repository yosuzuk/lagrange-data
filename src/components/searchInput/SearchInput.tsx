import { useState, useCallback, useTransition, useEffect, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useColorMode } from '../../theme/context/ThemeProvider';

interface IProps {
    id: string;
    value: string;
    placeholder?: string;
    lowerCase?: boolean;
    onChange: (input: string) => void;
}

export const SearchInput = (props: IProps) => {
    const { id, value: initialValue, placeholder, lowerCase, onChange } = props;
    const [value, setValue] = useState<string>(initialValue);
    const { mode } = useColorMode();

    const handleChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    const [_isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            onChange(lowerCase ? value.trim().toLowerCase() : value.trim());
        });
    }, [value, lowerCase, onChange]);

    return (
        <TextField
            id={id}
            type="search"
            size="small"
            value={value}
            placeholder={placeholder}
            onChange={handleChangeValue}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                sx: {
                    backgroundColor: mode === 'dark' ? undefined : 'white',
                },
            }}
            variant="outlined"
        />
    );
};
