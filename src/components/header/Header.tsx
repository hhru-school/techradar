import { FC, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

import { logOut, setAuthFormOpen } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AuthFormModal from '../modals/authFormModal/AuthFormModal';
import RegistrationFormModal from '../modals/registrationFormModal/RegistrationFormModal';

const PaperProps = {
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
};

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.auth.username);
    const tokenAccess = useAppSelector((state) => state.auth.tokenAccess);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUnauthorization = () => {
        setAnchorEl(null);
        dispatch(logOut());
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
                                {tokenAccess && username ? (
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar>{username[0]}</Avatar>
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        onClick={() => dispatch(setAuthFormOpen(true))}
                                        size="small"
                                        sx={{ ml: 2 }}
                                    >
                                        <AccountCircleIcon sx={{ color: 'white', fontSize: 49 }} />
                                    </IconButton>
                                )}
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={PaperProps}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <Link to="/my-radars">
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <RadarIcon fontSize="small" />
                                    </ListItemIcon>
                                    Мои радары
                                </MenuItem>
                            </Link>
                            <Divider />
                            <MenuItem onClick={handleUnauthorization}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Выйти
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            <RegistrationFormModal />
            <AuthFormModal />
        </>
    );
};

export default Header;
