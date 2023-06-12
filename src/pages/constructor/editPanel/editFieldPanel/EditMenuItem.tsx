import { FC, useState } from 'react';
import { Edit } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../../../store/hooks';

const style = {
    menuItem: {
        minWidth: 200,
    },
};

type Props = {
    item: { id: number; name: string };
    openModalActionCreator: ActionCreatorWithPayload<{ id: number; name: string }>;
    closeHandler: () => void;
};

const EditMenuItem: FC<Props> = ({ item, openModalActionCreator, closeHandler }) => {
    const [icon, setIcon] = useState(false);

    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(openModalActionCreator(item));
        closeHandler();
    };

    return (
        <MenuItem
            sx={style.menuItem}
            onClick={clickHandler}
            onMouseOver={() => {
                setIcon(true);
            }}
            onMouseOut={() => setIcon(false)}
        >
            <ListItemText> {item.name}</ListItemText>
            <ListItemIcon>{icon && <Edit />} </ListItemIcon>
        </MenuItem>
    );
};

export default EditMenuItem;
