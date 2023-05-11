import { FC, useMemo, useState } from 'react';
import { Button, Menu } from '@mui/material';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import EditMenuItem from './EditMenuItem';

type Props = {
    itemNames: string[];
    label: string;
    buttonIcon?: React.ReactNode;
    deleteBtnActionCreator: ActionCreatorWithPayload<string>;
    editBtnActionCreator: ActionCreatorWithPayload<string>;
};

const EditItemsDropDown: FC<Props> = ({
    itemNames,
    label,
    buttonIcon,
    deleteBtnActionCreator,
    editBtnActionCreator,
}) => {
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
                    name={name}
                    deleteBtnActionCreator={deleteBtnActionCreator}
                    editBtnActionCreator={editBtnActionCreator}
                />
            )),
        [itemNames, deleteBtnActionCreator, editBtnActionCreator]
    );
    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                endIcon={buttonIcon}
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
            </Menu>
        </div>
    );
};

export default EditItemsDropDown;
