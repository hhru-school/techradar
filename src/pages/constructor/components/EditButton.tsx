import { FC } from 'react';
import { Edit } from '@mui/icons-material';
import { IconButton, SxProps, Theme } from '@mui/material';
import { blue } from '@mui/material/colors';

const sx: SxProps<Theme> = { width: 28, height: 28, '&:hover': { backgroundColor: blue[400], color: 'white' } };

type Props = { onClick: () => void };

const EditButton: FC<Props> = ({ onClick }) => {
    return (
        <IconButton aria-label="edit" sx={sx} onClick={onClick}>
            <Edit fontSize="small" />
        </IconButton>
    );
};

export default EditButton;
