import { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

type Props = {
    id: string;
    label: string;
    items: string[];
    name: string;
};

const AddTechModalSelectInput: FC<Props> = ({ id, label, items, name }) => {
    const [field, meta] = useField(name);
    return (
        <FormControl sx={{ marginTop: '20px' }}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select {...field} labelId={id} label={label}>
                {items.map((item, i) => (
                    <MenuItem key={i} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </FormControl>
    );
};

export default AddTechModalSelectInput;
