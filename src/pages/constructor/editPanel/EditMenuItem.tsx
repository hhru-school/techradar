import { FC } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../../store/hooks';

type Props = {
    name: string;
    deleteBtnActionCreator: ActionCreatorWithPayload<string>;
    editBtnActionCreator: ActionCreatorWithPayload<string>;
    isOnlyItem: boolean;
};

const EditMenuItem: FC<Props> = ({ name, deleteBtnActionCreator, editBtnActionCreator, isOnlyItem }) => {
    const dispatch = useAppDispatch();

    const editClickHandler = () => {
        dispatch(editBtnActionCreator(name));
    };

    const deleteClickHandler = () => {
        dispatch(deleteBtnActionCreator(name));
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
            {name}
        </MenuItem>
    );
};

export default EditMenuItem;
