import { FC, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Container, Button, SxProps, Checkbox, FormControlLabel } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../api/companyRadarsApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCreateVersionModalOpen, setFilteredListVersions } from '../../../store/myRadarsSlice';
import CompanyCreateModal from './companyCreateModal/CompanyCreateModal';
import InfoBtn from './infoBtn/InfoBtn';
import MyRadarCreateModal from './myRadarCreateModal/MyRadarCreateModal';
import MyRadarsDataGrid from './myRadarsDataGrid/MyRadarsDataGrid';
import RadarsChips from './radarsChips/RadarsChips';

import './MyRadars.less';

const styles: Record<string, SxProps> = {
    tabs: { display: 'flex', alignItems: 'center', height: '48px' },
    tab: { minHeight: '48px' },
    newVersionBtn: { textAlign: 'left', margin: '15px 0 15px 0' },
    reset: { textAlign: 'left', margin: '15px 0 15px 15px' },
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
    const showCreateRadarModal = useAppSelector((state) => state.myRadars.showCreateRadarModal);
    const paramCompanyId = currentCompany ? currentCompany.id : 0;
    const { data: allCompanyRadars, refetch } = useGetAllCompanyRadarsQuery(paramCompanyId);
    const isfilteredVersionsList = useAppSelector((state) => state.myRadars.isfilteredVersionsList);

    const handleCreateVersionModalOpen = useCallback(() => {
        if (paramRadarId) dispatch(setCreateVersionModalOpen({ show: true, radarId: +paramRadarId }));
    }, [dispatch, paramRadarId]);

    useEffect(() => {
        if (!paramRadarId && allCompanyRadars && allCompanyRadars.length && paramCompanyId) {
            navigate(`company/${paramCompanyId}/grid/${allCompanyRadars[0].id}`);
        } else if (allCompanyRadars && !allCompanyRadars.length && paramCompanyId) {
            navigate(`company/${paramCompanyId}`);
        } else if (paramRadarId && allCompanyRadars && allCompanyRadars.length) {
            const match = allCompanyRadars.find((radar) => radar.id === +paramRadarId);

            if (!match) {
                navigate(`company/${paramCompanyId}/grid/${allCompanyRadars[0].id}`);
            }
        }
    }, [allCompanyRadars, paramCompanyId, navigate, paramRadarId, showCreateRadarModal]);

    const handleChange = useCallback(
        () => dispatch(setFilteredListVersions(!isfilteredVersionsList)),
        [dispatch, isfilteredVersionsList]
    );

    const handleReset = useCallback(() => refetch(), [refetch]);

    return (
        <>
            <Container maxWidth="xl">
                <RadarsChips />
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
                    <Button
                        onClick={handleReset}
                        variant="outlined"
                        color="primary"
                        sx={styles.reset}
                        disabled={!allCompanyRadars?.length}
                    >
                        Сбросить таблицу
                    </Button>
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
