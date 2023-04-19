import { FC, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import Logout from '@mui/icons-material/Logout';
import RadarIcon from '@mui/icons-material/Radar';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import {
    // setAuthFormOpen,
    setAuthFormData,
} from '../../store/dataSlice';
import {
    useAppDispatch,
    // useAppSelector
} from '../../store/hooks';
import AuthFormModal from '../AuthFormModal/AuthFormModal';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    // const authentificationFormData = useAppSelector((state) => state.data.authentificationFormData);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        dispatch(setAuthFormData({ email: null, password: null }));
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ margin: 'auto 0' }}>
                            <Link to="/">
                                <RadarIcon />
                            </Link>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/">TechRadar</Link>
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Tooltip title="Account settings">
                                {/* {authentificationFormData.email === null ? (
                                    <IconButton
                                        onClick={() => dispatch(setAuthFormOpen(true))}
                                        size="small"
                                        sx={{ ml: 2 }}
                                    >
                                        <Avatar src="/broken-image.jpg" />
                                    </IconButton>
                                ) : ( */}
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src="/broken-image.jpg" />
                                    {/* <Avatar>{authentificationFormData.email[0]}</Avatar> */}
                                </IconButton>
                                {/* )} */}
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <Link to="/my-radars/grid/android">
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <RadarIcon fontSize="small" />
                                    </ListItemIcon>
                                    Мои радары
                                </MenuItem>
                            </Link>
                            <Link to="/my-tech">
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <ConstructionIcon fontSize="small" />
                                    </ListItemIcon>
                                    Мои технологии
                                </MenuItem>
                            </Link>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Выйти
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>

            <AuthFormModal />
        </>
    );
};

export default Header;
