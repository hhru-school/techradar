import { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

type Props = {
    onChange: (value: string) => void;
    clear: () => void;
    value: string;
};

const SearchField: FC<Props> = ({ onChange, clear, value }) => {
    const clearBtnHandler = useCallback(() => {
        clear();
    }, [clear]);

    const inputProps = useMemo(
        () => ({
            startAdornment: (
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onMouseDown={clearBtnHandler} onClick={clearBtnHandler}>
                        <Clear />
                    </IconButton>
                </InputAdornment>
            ),
        }),
        [clearBtnHandler]
    );

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <TextField label="Найти" variant="standard" InputProps={inputProps} onChange={changeHandler} value={value} />
    );
};

export default memo(SearchField);
