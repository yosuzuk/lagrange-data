import { useState, useCallback, useTransition, useEffect, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
    id: string;
    value: string;
    lowerCase?: boolean;
    onChange: (input: string) => void;
}

export const SearchInput = (props: IProps) => {
    const { id, value: initialValue, lowerCase, onChange } = props;
    const [value, setValue] = useState<string>(initialValue);

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
            onChange={handleChangeValue}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            variant="outlined"
        />
    );
};
