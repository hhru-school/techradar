import { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

type InputProps = {
    label: string;
    name: string;
    id?: string;
    type?: string;
    autoComplete?: string;
    placeholder?: string;
};

const TextInputOutlined = ({ ...props }: InputProps): ReactElement => {
    const [field, meta] = useField(props);
    const hasError = Boolean(meta.touched && meta.error);

    return (
        <>
            <TextField
                {...field}
                {...props}
                error={hasError}
                id="outlined-basic"
                variant="outlined"
                sx={{ marginTop: '20px' }}
            />
            {hasError ? <div className="error">{meta.error}</div> : null}
        </>
    );
};

export default TextInputOutlined;
