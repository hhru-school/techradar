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
            <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex' }}>
                <Tabs
                    sx={{ display: 'flex', alignItems: 'center', height: '48px' }}
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
                                    sx={{ minHeight: '48px' }}
                                    label={item.name}
                                    icon={
                                        <Link key={item.id} to={`grid/${item.name.split(' ')[0]}`} id={'tab-link'}>
                                            {item.name}
                                        </Link>
                                    }
                                />
                            );
                        })}
                </Tabs>
                <Button onClick={handleClick} variant="outlined" color="secondary" sx={{ height: '25px', mt: '11px' }}>
                    +
                </Button>
                <Button onClick={handleClick} variant="outlined" color="secondary" sx={{ height: '25px', mt: '11px' }}>
                    +
                </Button>
            </Box>
            <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 0 40px' }}>
                Радары
            </Typography>
            <Link to={'/admin/radar-constructor'}>
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
