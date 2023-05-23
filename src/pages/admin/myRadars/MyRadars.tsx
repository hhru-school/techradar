import { FC, SyntheticEvent, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Tab, Tabs, Button } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../api/companyRadarsApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setRadarsCreateModalOpen } from '../../../store/myRadarsSlice';
import MyRadarCreateModal from './myRadarCreateModal/MyRadarCreateModal';
import MyRadarsDataGrid from './myRadarsDataGrid/MyRadarsDataGrid';

import './MyRadars.less';

const styles = {
    tabs: { display: 'flex', alignItems: 'center', height: '48px' },
    tab: { minHeight: '48px' },
    newRadarBtn: { height: '25px', mt: '11px' },
    title: { textAlign: 'left', margin: '15px 0 0 40px' },
    newVersionBtn: { textAlign: 'left', margin: '15px 0 15px 40px' },
    box: { display: 'flex' },
};

type Tab = { id: number; label: string };

const MyRadar: FC = () => {
    const dispatch = useAppDispatch();
    const showRadarsCreateModal = useAppSelector((state) => state.myRadars.showRadarsCreateModal);
    const { data: allCompanyRadars } = useGetAllCompanyRadarsQuery(1);

    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClick = useCallback(() => dispatch(setRadarsCreateModalOpen(true)), [dispatch]);

    return (
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
                    {allCompanyRadars &&
                        allCompanyRadars.map((item) => {
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
                        })}
                </Tabs>
                <Link to={'/constructor/new/radar'}>
                    <Button onClick={handleClick} variant="outlined" color="secondary" sx={styles.newRadarBtn}>
                        +
                    </Button>
                </Link>
            </Box>
            <Typography variant="h5" sx={styles.title}>
                Радары
            </Typography>
            <Link to={'/constructor/new/radar'}>
                <Button variant="outlined" color="secondary" sx={{ textAlign: 'left', margin: '15px 0 15px 40px' }}>
                    Новая версия +
                </Button>
            </Link>
            <Routes>
                <Route path="/grid/:rowsId" element={<MyRadarsDataGrid />} />
            </Routes>
            {showRadarsCreateModal && <MyRadarCreateModal />}
        </Container>
    );
};

export default MyRadar;
