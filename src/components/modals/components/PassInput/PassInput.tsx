import { FC, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    SxProps,
} from '@mui/material';
import { useField } from 'formik';

export const styles: Record<string, SxProps> = {
    formControl: { marginTop: '20px' },
};

type InputProps = {
    label: string;
    name: string;
    id?: string;
    type?: string;
    autoComplete: string;
    disabled?: boolean;
};

const PassInput: FC<InputProps> = ({ label, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [field, meta] = useField(props);

    const hasError = Boolean(meta.touched && meta.error);

    return (
        <FormControl variant="outlined" sx={styles.formControl} error={!!hasError}>
            <InputLabel htmlFor={props.id}>{label}</InputLabel>
            <OutlinedInput
                {...field}
                {...props}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            {hasError ? <FormHelperText>{meta.error}</FormHelperText> : null}
        </FormControl>
    );
};

export default PassInput;
