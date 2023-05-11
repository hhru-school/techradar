import { FC } from 'react';
import { Edit } from '@mui/icons-material';
import { IconButton, SxProps, Theme } from '@mui/material';
import { blue } from '@mui/material/colors';

const sx: SxProps<Theme> = { width: 25, height: 25, '&:hover': { backgroundColor: blue[400], color: 'white' } };

const EditButton: FC = () => {
    return (
        <IconButton aria-label="edit" sx={sx}>
            <Edit fontSize="small" />
        </IconButton>
    );
};

export default EditButton;
