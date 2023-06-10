import { FC, useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Container, Button, SxProps, Chip } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../api/companyRadarsApi';
import { useAppDispatch } from '../../../store/hooks';
import { setCreateVersionModalOpen } from '../../../store/myRadarsSlice';
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
                <Button
                    onClick={handleCreateVersionModalOpen}
                    variant="outlined"
                    color="primary"
                    sx={styles.newVersionBtn}
                >
                    Сделать следующую версию +
                </Button>
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
