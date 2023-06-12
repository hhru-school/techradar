import { FC } from 'react';
import { MenuItem } from '@mui/material';
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
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(openModalActionCreator(item));
        closeHandler();
    };

    return (
        <MenuItem sx={style.menuItem} onClick={clickHandler}>
            {item.name}
        </MenuItem>
    );
};

export default EditMenuItem;
