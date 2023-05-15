import { FC, useState, Fragment } from 'react';
import { Typography, Box, Button, Drawer, Grid, TextField } from '@mui/material';

import SideBarItem from './sideBarItem/SideBarItem';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const boxStyle = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '95%',
    borderRadius: '5px',
    padding: '15px 15px',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
};

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

    const list = () => (
        <Box sx={{ width: '250px', padding: '0 16px' }} role="presentation">
            <Grid container spacing={2} sx={{ mt: '5px' }}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        maxHeight: '95vh',
                    }}
                >
                    <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '5px' }}>
                        Лог событий
                    </Typography>
                    <TextField
                        sx={{ width: '100%' }}
                        size={'small'}
                        id="outlined-basic"
                        label="Поиск"
                        variant="outlined"
                        placeholder="Искать по логу..."
                    />
                    <Box sx={boxStyle}>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                            <SideBarItem key={index} />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <div>
            <Fragment>
                <Button onClick={toggleDrawer('right', true)} variant="contained" color={'primary'}>
                    Лог событий
                </Button>

                <Drawer anchor={'right'} open={state.right} onClose={toggleDrawer('right', false)}>
                    {list()}
                </Drawer>
            </Fragment>
        </div>
    );
};

export default SideBar;
