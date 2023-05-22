import { FC, useCallback, useState } from 'react';
import { Button, Drawer } from '@mui/material';

import LogList from '../logList/LogList';

const SideBar: FC = () => {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    return (
        <div>
            <Button onClick={handleClick} variant="contained" color={'primary'}>
                Лог событий
            </Button>

            <Drawer anchor={'right'} open={open} onClose={handleClose}>
                <LogList boxWidth="250px" boxMaxHeight="88vh" />
            </Drawer>
        </div>
    );
};

export default SideBar;
