import { FC, useCallback, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Container, Button, SxProps, Chip, Checkbox, FormControlLabel } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../api/companyRadarsApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCreateVersionModalOpen, setFilteredListVersions } from '../../../store/myRadarsSlice';
import CompanyCreateModal from './companyCreateModal/CompanyCreateModal';
import InfoBtn from './infoBtn/InfoBtn';
import MyRadarCreateModal from './myRadarCreateModal/MyRadarCreateModal';
import MyRadarsDataGrid from './myRadarsDataGrid/MyRadarsDataGrid';

import './MyRadars.less';

const styles: Record<string, SxProps> = {
    tabs: { display: 'flex', alignItems: 'center', height: '48px' },
    tab: { minHeight: '48px' },
    newVersionBtn: { textAlign: 'left', margin: '15px 0 15px 0' },
    title: { textAlign: 'left', margin: '15px 0 0 0' },
    box: { display: 'flex' },
    defaultChip: { borderRadius: 1, fontSize: 14 },
    formControlLabel: { margin: '0 0 0 5px' },
    checkboxBox: { display: 'flex', alignItems: 'center' },
    chipsItemsBox: { marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' },
    insteadChipsTypo: { margin: '0 auto' },
};

const MyRadar: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { paramRadarId } = useParams();
    const currentCompany = useAppSelector((state) => state.company.currentCompany);

    const companyId = currentCompany ? currentCompany.id : 0;
    const { data: allCompanyRadars } = useGetAllCompanyRadarsQuery(companyId);
    const isfilteredVersionsList = useAppSelector((state) => state.myRadars.isfilteredVersionsList);

    const handleCreateVersionModalOpen = useCallback(() => {
        if (paramRadarId) dispatch(setCreateVersionModalOpen({ show: true, radarId: +paramRadarId }));
    }, [dispatch, paramRadarId]);

    useEffect(() => {
        if (!paramRadarId && allCompanyRadars && !allCompanyRadars.length && currentCompany) {
            navigate(`company/${currentCompany.id}`);
        } else if (!paramRadarId && allCompanyRadars && allCompanyRadars.length && currentCompany) {
            navigate(`company/${currentCompany.id}/grid/${allCompanyRadars[0].id}`);
        }
    });

    useEffect(() => {
        if (currentCompany && allCompanyRadars && !allCompanyRadars.length) {
            navigate(`company/${currentCompany.id}`);
        }
    }, [allCompanyRadars, currentCompany, navigate, paramRadarId]);

    const tabsItems = useMemo(
        () =>
            allCompanyRadars &&
            currentCompany &&
            allCompanyRadars.map((radar) => {
                const isActive = Number(paramRadarId) === radar.id;

                return (
                    <Chip
                        color={isActive ? 'success' : 'default'}
                        sx={styles.defaultChip}
                        key={radar.id}
                        label={radar.name.toUpperCase()}
                        onClick={() => {
                            navigate(`company/${currentCompany.id}/grid/${radar.id}`);
                        }}
                    />
                );
            }),
        [allCompanyRadars, navigate, paramRadarId, currentCompany]
    );

    const handleChange = useCallback(
        () => dispatch(setFilteredListVersions(!isfilteredVersionsList)),
        [dispatch, isfilteredVersionsList]
    );

    return (
        <>
            <Container maxWidth="xl">
                <Box sx={styles.chipsItemsBox} className="container">
                    {allCompanyRadars?.length ? (
                        tabsItems
                    ) : (
                        <Typography variant="h6" sx={styles.insteadChipsTypo}>
                            Здесь можно будет переключаться между радарами
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
                            control={
                                <Checkbox
                                    onChange={handleChange}
                                    checked={!isfilteredVersionsList}
                                    disabled={!allCompanyRadars?.length}
                                />
                            }
                            label="Показать все версии"
                        />
                        <InfoBtn />
                    </Box>
                </Box>
                <Routes>
                    <Route path="/" element={<MyRadarsDataGrid />} />
                    <Route path="/company/:companyId" element={<MyRadarsDataGrid />} />
                    <Route path="/company/:companyId/grid/:radarId" element={<MyRadarsDataGrid />} />
                </Routes>
            </Container>
            <MyRadarCreateModal />
            <CompanyCreateModal />
        </>
    );
};

export default MyRadar;
