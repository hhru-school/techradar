import { FC, useCallback, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import { Typography, Box, Container, Button, SxProps, Chip, Checkbox, FormControlLabel, Popover } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../api/companyRadarsApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCreateVersionModalOpen, setFilteredListVersions } from '../../../store/myRadarsSlice';
import MyRadarCreateModal from './myRadarCreateModal/MyRadarCreateModal';
import MyRadarsDataGrid from './myRadarsDataGrid/MyRadarsDataGrid';

import './MyRadars.less';

const styles: Record<string, SxProps> = {
    tabs: { display: 'flex', alignItems: 'center', height: '48px' },
    tab: { minHeight: '48px' },
    newVersionBtn: { textAlign: 'left', margin: '15px 0 15px 40px' },
    title: { textAlign: 'left', margin: '15px 0 0 40px' },
    box: { display: 'flex' },
    defaultChip: { borderRadius: 1, fontSize: 14 },
};

const MyRadar: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { paramRadarId } = useParams();
    const { data: allCompanyRadars } = useGetAllCompanyRadarsQuery(1);
    const filteredVersionsList = useAppSelector((state) => state.myRadars.filteredVersionsList);

    const handleCreateVersionModalOpen = useCallback(() => {
        if (paramRadarId) dispatch(setCreateVersionModalOpen({ show: true, radarId: +paramRadarId }));
    }, [dispatch, paramRadarId]);

    const tabsItems = useMemo(
        () =>
            allCompanyRadars &&
            allCompanyRadars.map((radar, index) => {
                const isActive = Number(paramRadarId) === radar.id;

                if (!paramRadarId && index === 0) {
                    navigate(`grid/${radar.id}`);
                }

                return (
                    <Chip
                        color={isActive ? 'success' : 'default'}
                        sx={styles.defaultChip}
                        key={radar.id}
                        label={radar.name.toUpperCase()}
                        onClick={() => {
                            navigate(`grid/${radar.id}`);
                        }}
                    />
                );
            }),
        [allCompanyRadars, navigate, paramRadarId]
    );

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleChange = useCallback(
        () => dispatch(setFilteredListVersions(!filteredVersionsList)),
        [dispatch, filteredVersionsList]
    );

    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }} className="container">
                    {allCompanyRadars?.length ? (
                        tabsItems
                    ) : (
                        <Typography variant="h6" sx={{ margin: '0 auto' }}>
                            Здесь можно будет переключаться по радарам
                        </Typography>
                    )}
                </Box>
                <Typography variant="h5" sx={styles.title}>
                    Радары
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <Button
                        onClick={handleCreateVersionModalOpen}
                        variant="outlined"
                        color="primary"
                        sx={styles.newVersionBtn}
                        disabled={!allCompanyRadars?.length}
                    >
                        Сделать следующую версию +
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                            sx={{ margin: '0 0 0 5px' }}
                            control={<Checkbox onChange={handleChange} />}
                            label="Показать все версии"
                        />
                        <Button
                            aria-describedby={id}
                            onClick={handleClick}
                            sx={{
                                borderRadius: '100%',
                                height: '17px',
                                minWidth: '0px',
                                padding: '0',
                                width: '17px',
                                ml: '4px',
                            }}
                        >
                            <InfoIcon fontSize="small" />
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2 }}>
                                Если чекбокс неактивен, скрыты все черновики, не связанные с последней публичной версией
                            </Typography>
                        </Popover>
                    </Box>
                </Box>
                <Routes>
                    <Route path="/" element={<MyRadarsDataGrid />} />
                    <Route path="/grid/:radarId" element={<MyRadarsDataGrid />} />
                </Routes>
            </Container>
            <MyRadarCreateModal />
        </>
    );
};

export default MyRadar;
