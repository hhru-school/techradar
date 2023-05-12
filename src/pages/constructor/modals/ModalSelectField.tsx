import { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

type Props = {
    label: string;
    name: string;
    values: string[];
};

const sx = { width: 300, my: '8px' };

const ModalSelectField: FC<Props> = ({ label, name, values }) => {
    const [field] = useField({ name });

    const items = values.map((value, i) => (
        <MenuItem key={i} value={value}>
            {value}
        </MenuItem>
    ));

    return (
        <FormControl sx={sx}>
            <InputLabel>{label}</InputLabel>
            <Select label={label} {...field}>
                {items}
            </Select>
        </FormControl>
    );
};

export default ModalSelectField;
