import { ReactElement } from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useField } from 'formik';

export interface InputProps {
    label: string;
    name: string;
    id?: string;
    type: string;
    autoComplete?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const TextInputStandart = ({ label, id, onChange, ...props }: InputProps): ReactElement => {
    const [field, meta] = useField(props);

    return (
        <FormControl sx={{ m: 1, width: '160px' }} variant="standard">
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Input
                id={id}
                {...field}
                {...props}
                aria-describedby="helper-text"
                inputProps={{
                    'aria-label': 'radar-input',
                }}
                onChange={onChange}
            />
            <FormHelperText id="helper-text">{meta.error}</FormHelperText>
        </FormControl>
    );
};
