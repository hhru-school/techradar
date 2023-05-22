import { FC, useCallback, useState } from 'react';
import { Button, Drawer } from '@mui/material';

import LogList from '../logList/LogList';

const SideBar: FC = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = useCallback(
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setOpen(open);
        },
        []
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)} variant="contained" color={'primary'}>
                Лог событий
            </Button>

            <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
                <LogList boxWidth="250px" boxMaxHeight="88vh" />
            </Drawer>
        </div>
    );
};

export default SideBar;
