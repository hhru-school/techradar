import { FC } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { Ring, Sector } from '../../../components/radar/types';
import { useAppDispatch } from '../../../store/hooks';

type Props = {
    item: Sector | Ring;
    deleteBtnActionCreator: ActionCreatorWithPayload<number>;
    editBtnActionCreator: ActionCreatorWithPayload<number>;
    isOnlyItem: boolean;
};

const EditMenuItem: FC<Props> = ({ item, deleteBtnActionCreator, editBtnActionCreator, isOnlyItem }) => {
    const dispatch = useAppDispatch();

    const editClickHandler = () => {
        dispatch(editBtnActionCreator(item.id));
    };

    const deleteClickHandler = () => {
        dispatch(deleteBtnActionCreator(item.id));
    };

    return (
        <MenuItem>
            <IconButton onClick={editClickHandler}>
                <Edit />
            </IconButton>
            {!isOnlyItem && (
                <IconButton onClick={deleteClickHandler}>
                    <Delete />
                </IconButton>
            )}
            {item.name}
        </MenuItem>
    );
};

export default EditMenuItem;
