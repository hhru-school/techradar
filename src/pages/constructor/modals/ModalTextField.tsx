import { FC } from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

type Props = {
    label?: string;
    name: string;
    multiline?: boolean;
};

const sx = { width: 300, my: '8px' };

const ModalTextField: FC<Props> = ({ label, name, multiline = false }) => {
    const [field, meta] = useField(name);
    const helperText = meta.touched && meta.error ? meta.error : null;

    return (
        <TextField
            id={name}
            error={Boolean(meta.touched && meta.error)}
            label={label}
            helperText={helperText}
            {...field}
            sx={sx}
            multiline={multiline}
            rows={4}
        ></TextField>
    );
};

export default ModalTextField;
