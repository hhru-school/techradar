import { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Container, Tab, Tabs, Button, SxProps } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../api/companyRadarsApi';
import { useAppDispatch } from '../../../store/hooks';
import { setCreateVersionModalOpen } from '../../../store/myRadarsSlice';
import MyRadarCreateModal from './myRadarCreateModal/MyRadarCreateModal';
import MyRadarsDataGrid from './myRadarsDataGrid/MyRadarsDataGrid';

import './MyRadars.less';

const styles: Record<string, SxProps> = {
    tabs: { display: 'flex', alignItems: 'center', height: '48px' },
    tab: { minHeight: '48px' },
    newRadarBtn: { height: '25px', mt: '11px', width: '153px' },
    title: { textAlign: 'left', margin: '15px 0 0 40px' },
    newVersionBtn: { textAlign: 'left', margin: '15px 0 15px 40px' },
    box: { display: 'flex' },
};

type Tab = { id: number; label: string };

const MyRadar: FC = () => {
    const dispatch = useAppDispatch();
    const { paramRadarId } = useParams();
    const { data: allCompanyRadars } = useGetAllCompanyRadarsQuery(1);
    const [value, setValue] = useState<number>(0);

    const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    const handleCreateVersionModalOpen = useCallback(() => {
        if (paramRadarId) dispatch(setCreateVersionModalOpen({ show: true, radarId: +paramRadarId }));
    }, [dispatch, paramRadarId]);

    const tabsItems = useMemo(
        () =>
            allCompanyRadars &&
            allCompanyRadars.map((item, i) => {
                if (paramRadarId && item.id === +paramRadarId) {
                    setValue(i);
                }

                return (
                    <Tab
                        key={item.id}
                        sx={styles.tab}
                        label={item.name}
                        icon={
                            <Link key={item.id} to={`grid/${item.id}`} id={'tab-link'}>
                                {item.name}
                            </Link>
                        }
                    />
                );
            }),
        [allCompanyRadars, paramRadarId]
    );

    return (
        <>
            <Container maxWidth="xl">
                <Box sx={styles.box}>
                    <Tabs
                        sx={styles.tabs}
                        value={value}
                        onChange={handleChange}
                        scrollButtons
                        variant="scrollable"
                        allowScrollButtonsMobile
                    >
                        {tabsItems}
                    </Tabs>
                    <Link to={'/constructor/new/radar'}>
                        <Button variant="outlined" color="secondary" sx={styles.newRadarBtn}>
                            Создать радар
                        </Button>
                    </Link>
                </Box>
                <Typography variant="h5" sx={styles.title}>
                    Радары
                </Typography>
                <Button
                    onClick={handleCreateVersionModalOpen}
                    variant="outlined"
                    color="secondary"
                    sx={styles.newVersionBtn}
                >
                    Сделать следующую версию +
                </Button>
                <Routes>
                    <Route path="/grid/:radarId" element={<MyRadarsDataGrid />} />
                </Routes>
                <MyRadarCreateModal />
            </Container>
        </>
    );
};

export default MyRadar;
