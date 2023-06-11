import { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
    formControlLabel: { margin: '0 0 0 5px' },
    checkboxBox: { display: 'flex', alignItems: 'center' },
    chipsItemsBox: { marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' },
    insteadChipsTypo: { margin: '0 auto' },
};

const InfoBtn: FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
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
        </>
    );
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

    useEffect(() => {
        if (!paramRadarId && allCompanyRadars) {
            navigate(`grid/${allCompanyRadars[0].id}`);
        }
    });

    const tabsItems = useMemo(
        () =>
            allCompanyRadars &&
            allCompanyRadars.map((radar) => {
                const isActive = Number(paramRadarId) === radar.id;

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

    const handleChange = useCallback(
        () => dispatch(setFilteredListVersions(!filteredVersionsList)),
        [dispatch, filteredVersionsList]
    );

    return (
        <>
            <Container maxWidth="xl">
                <Box sx={styles.chipsItemsBox} className="container">
                    {allCompanyRadars?.length ? (
                        tabsItems
                    ) : (
                        <Typography variant="h6" sx={styles.insteadChipsTypo}>
                            Здесь можно будет переключаться по радарам
                        </Typography>
                    )}
                </Box>
                <Typography variant="h5" sx={styles.title}>
                    Радары
                </Typography>
                <Box sx={styles.box}>
                    <Button
                        onClick={handleCreateVersionModalOpen}
                        variant="outlined"
                        color="primary"
                        sx={styles.newVersionBtn}
                        disabled={!allCompanyRadars?.length}
                    >
                        Сделать следующую версию +
                    </Button>
                    <Box sx={styles.checkboxBox}>
                        <FormControlLabel
                            sx={styles.formControlLabel}
                            control={<Checkbox onChange={handleChange} checked={!filteredVersionsList} />}
                            label="Показать все версии"
                        />
                        <InfoBtn />
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
