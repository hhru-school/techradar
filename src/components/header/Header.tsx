import { FC, useState, MouseEvent, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import RadarIcon from '@mui/icons-material/Radar';
import {
    PopoverOrigin,
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';

import { logOut, setAuthFormOpen } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AuthFormModal from '../modals/authFormModal/AuthFormModal';
import RegistrationFormModal from '../modals/registrationFormModal/RegistrationFormModal';

const styles = {
    iconBtnUnauth: { ml: 2 },
    iconBtn: { margin: 'auto 0' },
    label: { flexGrow: 1 },
    menu: {
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
    iconBox: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    circleIcon: { color: 'white', fontSize: 49 },
    iconBtnAuth: { ml: 2 },
};

const PaperProps = {
    elevation: 0,
    sx: styles.menu,
};

const transformOrigin: PopoverOrigin = { horizontal: 'right', vertical: 'top' };
const anchorOrigin: PopoverOrigin = { horizontal: 'right', vertical: 'bottom' };

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const username = useAppSelector((state) => state.auth.username);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleUnauthorization = useCallback(() => {
        setAnchorEl(null);
        dispatch(logOut());
        navigate('/');
    }, [dispatch, navigate]);

    const handleAuthFormOpen = useCallback(() => dispatch(setAuthFormOpen(true)), [dispatch]);

    const ariaControlsIconBtn = open ? 'account-menu' : undefined;
    const ariaExpandedIconBtn = open ? 'true' : undefined;
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={styles.iconBtn}>
                            <Link to="/">
                                <RadarIcon />
                            </Link>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={styles.label}>
                            <Link to="/">TechRadar</Link>
                        </Typography>
                        <Box sx={styles.iconBox}>
                            <Tooltip title="Account settings">
                                {username ? (
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={styles.iconBtnAuth}
                                        aria-controls={ariaControlsIconBtn}
                                        aria-haspopup="true"
                                        aria-expanded={ariaExpandedIconBtn}
                                    >
                                        <Avatar>{username[0]}</Avatar>
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={handleAuthFormOpen} size="small" sx={styles.iconBtnUnauth}>
                                        <AccountCircleIcon sx={styles.circleIcon} />
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
                            transformOrigin={transformOrigin}
                            anchorOrigin={anchorOrigin}
                        >
                            <Link to="/admin/my-radars/grid/1">
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
