import { ChangeEvent, FC } from 'react';
import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

const inputProps = {
    endAdornment: (
        <InputAdornment position="end">
            <Search />
        </InputAdornment>
    ),
};

type Props = {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
};

const SearchField: FC<Props> = ({ onChange, onBlur, value }) => {
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const blurHandler = () => {
        onBlur();
    };

    return (
        <TextField
            label="Найти"
            variant="standard"
            InputProps={inputProps}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={value}
        />
    );
};

export default SearchField;
