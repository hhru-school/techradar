import { FC } from 'react';
import { Edit } from '@mui/icons-material';
import { IconButton, SxProps, Theme } from '@mui/material';
import { blue } from '@mui/material/colors';

const style: Record<string, SxProps<Theme>> = {
    button: {
        width: 18,
        height: 18,
        '&:hover': { backgroundColor: blue[400], color: 'white' },
    },
    icon: {
        fontSize: 16,
    },
};

type Props = { onClick: () => void };

const EditButton: FC<Props> = ({ onClick }) => {
    return (
        <IconButton aria-label="edit" sx={style.button} onClick={onClick}>
            <Edit sx={style.icon} />
        </IconButton>
    );
};

export default EditButton;
