import { FC, useCallback, useMemo, useState } from 'react';
import { Add } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, Menu, MenuItem } from '@mui/material';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { Ring, Sector } from '../../../../components/radar/types';
import { useAppDispatch } from '../../../../store/hooks';
import EditMenuItem from './EditMenuItem';

type Props = {
    items: Ring[] | Sector[];
    label: string;
    openModalActionCreator: ActionCreatorWithPayload<Ring | Sector>;
    addItemActionCreator: ActionCreatorWithoutPayload;
    maxNumber?: number;
};

const defaultMaxNumber = 8;

const style = { btnSx: { width: 130 } };

const EditItemsDropDown: FC<Props> = ({
    items,
    label,
    openModalActionCreator,
    addItemActionCreator,
    maxNumber = defaultMaxNumber,
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
            items.map((item) => (
                <EditMenuItem
                    key={item.id}
                    item={item}
                    openModalActionCreator={openModalActionCreator}
                    closeHandler={handleClose}
                />
            )),
        [items, openModalActionCreator]
    );

    const addItemClickHandler = useCallback(() => {
        setAnchorEl(null);
        dispatch(addItemActionCreator());
    }, [addItemActionCreator, dispatch]);

    return (
        <div>
            <Button
                id="basic-button"
                onClick={handleClick}
                variant="outlined"
                endIcon={<ArrowDropDownIcon />}
                sx={style.btnSx}
            >
                {label}
            </Button>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                {menuItems}
                {items.length < maxNumber && (
                    <MenuItem onClick={addItemClickHandler}>
                        <Add color="success" />
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default EditItemsDropDown;
