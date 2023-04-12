import { FC, useState, Fragment } from 'react';
import { Typography, Box, Button, Divider, Drawer, Grid } from '@mui/material';

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

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: '600px', padding: '20px' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider />
            <Grid container spacing={2} sx={{ mt: '5px' }}>
                <Grid
                    item
                    xs={6}
                    sx={{
                        maxHeight: '95vh',
                    }}
                >
                    <Typography variant="h5">Комментарии</Typography>
                    <Box
                        sx={{
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: '95%',
                            borderRadius: '5px',
                            padding: '15px 15px',
                            border: '1px solid',
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        }}
                    >
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                            <Box key={index} sx={{ borderBottom: '1px solid', marginBottom: '10px' }}>
                                <Typography>
                                    <strong>
                                        11/04/2023 <br />
                                        14:22
                                    </strong>
                                    <br />
                                    НИЧО ТАК Мне Зашло.
                                    <br /> Вася Пупкин
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{
                        maxHeight: '95vh',
                    }}
                >
                    <Typography variant="h5">Лог изменений</Typography>
                    <Box
                        sx={{
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
                        }}
                    >
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                            <Box key={index} sx={{ borderBottom: '1px solid', marginBottom: '10px' }}>
                                <Typography>
                                    <strong>
                                        11/04/2023 <br />
                                        20:22
                                    </strong>
                                    <br />
                                    Добавил преимущество, изменил ссылку на доку
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <div>
            <Fragment>
                <Button onClick={toggleDrawer('right', true)}>ИСТОРИЯ И КОММЕНТАРИИ</Button>

                <Drawer anchor={'right'} open={state.right} onClose={toggleDrawer('right', false)}>
                    {list('right')}
                </Drawer>
            </Fragment>
        </div>
    );
};

export default SideBar;
