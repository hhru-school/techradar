import { FC, useState, MouseEvent, useCallback } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
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
    Tooltip,
    Typography,
    Button,
} from '@mui/material';

import { useGetCompaniesQuery } from '../../api/companiesApi';
import { signOut, setAuthFormOpen } from '../../store/authSlice/authSlice';
import { setCompanyModalOpen, setCurrentCompany, setStaffModalOpen } from '../../store/companySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AuthFormModal from '../modals/authFormModal/AuthFormModal';
import CompanyModal from '../modals/companyModal/CompanyModal';
import CreateRadarModal from '../modals/createRadarModal/CreateRadarModal';
import RegistrationFormModal from '../modals/registrationFormModal/RegistrationFormModal';
import StaffModal from '../modals/staffModal/StaffModal';
import CompanySelect from './companySelect/CompanySelect';
import CreateRadarBtn from './createRadarBtn/CreateRadarBtn';
import { styles } from './styles';

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
    const currentCompany = useAppSelector((state) => state.company.currentCompany);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { data: companies } = useGetCompaniesQuery(null, { skip: !username });

    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleUnauthorization = useCallback(() => {
        setAnchorEl(null);
        dispatch(setCurrentCompany(null));
        dispatch(signOut());
        navigate('/');
    }, [dispatch, navigate]);

    const handleAuthFormOpen = useCallback(() => dispatch(setAuthFormOpen(true)), [dispatch]);
    const handleCompaniesOpen = useCallback(() => dispatch(setCompanyModalOpen(true)), [dispatch]);

    const handleOpenStaffModal = useCallback(() => {
        dispatch(setStaffModalOpen(true));
        setAnchorEl(null);
    }, [dispatch]);

    const ariaControlsIconBtn = open ? 'account-menu' : undefined;
    const ariaExpandedIconBtn = open ? 'true' : undefined;
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Box sx={styles.toolbar}>
                        <Box sx={styles.boxLeft}>
                            <Box sx={styles.boxLogo}>
                                <Link to="/">
                                    <RadarIcon sx={styles.icon} />
                                </Link>
                                <Typography variant="h6" component="div" sx={styles.label}>
                                    <Link to="/">TechRadar</Link>
                                </Typography>
                            </Box>

                            <Box sx={styles.boxLinks}>
                                <Button color="secondary" sx={styles.generalBtn}>
                                    <Link to="/">Главная</Link>
                                </Button>
                                <Button color="secondary" onClick={handleCompaniesOpen}>
                                    Радары компаний
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={styles.toolbarRight}>
                            {username ? (
                                <>
                                    <Routes>
                                        <Route
                                            path="/admin/my-radars/company/:companyId/*"
                                            element={<CompanySelect />}
                                        />
                                        <Route path="/admin/my-radars/*" element={<CompanySelect />} />
                                    </Routes>

                                    {companies && companies.length ? (
                                        <Routes>
                                            <Route path="/admin/my-radars/*" element={<CreateRadarBtn />} />
                                        </Routes>
                                    ) : (
                                        <div></div>
                                    )}
                                </>
                            ) : (
                                <div></div>
                            )}

                            <Box sx={styles.iconBox}>
                                <Tooltip title="Админ панель">
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
                                <Link to="/admin/my-radars">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <RadarIcon fontSize="small" />
                                        </ListItemIcon>
                                        Мои радары
                                    </MenuItem>
                                </Link>

                                {currentCompany ? (
                                    <MenuItem onClick={handleOpenStaffModal}>
                                        <ListItemIcon>
                                            <GroupIcon fontSize="small" />
                                        </ListItemIcon>
                                        Сотрудники
                                    </MenuItem>
                                ) : (
                                    <div></div>
                                )}

                                <Divider />
                                <MenuItem onClick={handleUnauthorization}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Выйти
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Container>
            </AppBar>
            <RegistrationFormModal />
            <AuthFormModal />
            <CreateRadarModal />
            <StaffModal />
            <CompanyModal />
        </>
    );
};

export default Header;
