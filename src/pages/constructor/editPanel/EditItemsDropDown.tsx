import { FC, useCallback, useMemo, useState } from 'react';
import { Add } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { useAppDispatch } from '../../../store/hooks';
import EditMenuItem from './EditMenuItem';

type Props = {
    itemNames: string[];
    label: string;
    deleteBtnActionCreator: ActionCreatorWithPayload<string>;
    editBtnActionCreator: ActionCreatorWithPayload<string>;
    addItemActionCreator: ActionCreatorWithoutPayload;
};

const btnSx = { width: 130 };

const EditItemsDropDown: FC<Props> = ({
    itemNames,
    label,
    deleteBtnActionCreator,
    editBtnActionCreator,
    addItemActionCreator,
}) => {
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = useMemo(
        () =>
            itemNames.map((name) => (
                <EditMenuItem
                    key={name}
                    name={name}
                    deleteBtnActionCreator={deleteBtnActionCreator}
                    editBtnActionCreator={editBtnActionCreator}
                    isOnlyItem={itemNames.length === 1}
                />
            )),
        [itemNames, deleteBtnActionCreator, editBtnActionCreator]
    );

    const addItemClickHandler = useCallback(() => {
        dispatch(addItemActionCreator());
    }, [addItemActionCreator, dispatch]);

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                endIcon={<ArrowDropDownIcon />}
                sx={btnSx}
            >
                {label}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItems}
                <MenuItem>
                    <IconButton color="success" onClick={addItemClickHandler}>
                        <Add />
                    </IconButton>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default EditItemsDropDown;
