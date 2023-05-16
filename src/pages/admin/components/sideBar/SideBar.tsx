import { FC, useState, Fragment } from 'react';
import { Button, Drawer } from '@mui/material';

import LogList from '../logList/LogList';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const SideBar: FC = () => {
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            <Fragment>
                <Button onClick={toggleDrawer('right', true)} variant="contained" color={'primary'}>
                    Лог событий
                </Button>

                <Drawer anchor={'right'} open={state.right} onClose={toggleDrawer('right', false)}>
                    <LogList boxWidth="250px" boxMaxHeight="88vh" />
                </Drawer>
            </Fragment>
        </div>
    );
};

export default SideBar;
