import { FC, SyntheticEvent, useState, useMemo, useCallback } from 'react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Tab, Tabs, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setRadarsCreateModalOpen } from '../../../store/myRadarsSlice';
import MyRadarCreateModal from './myRadarCreateModal/MyRadarCreateModal';
import MyRadarsDataGrid from './myRadarsDataGrid/MyRadarsDataGrid';

import './MyRadars.less';

type Tab = { id: number; label: string };

const MyRadar: FC = () => {
    const dispatch = useAppDispatch();
    const radarGrid = useAppSelector((state) => state.myRadars.radarGrid);
    const showRadarsCreateModal = useAppSelector((state) => state.myRadars.showRadarsCreateModal);

    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = useMemo(() => Object.keys(radarGrid).map((key, index) => ({ id: index, label: key })), [radarGrid]);

    const handleClick = useCallback(() => dispatch(setRadarsCreateModalOpen(true)), [dispatch]);

    return (
        <Container maxWidth="xl">
            <Box>
                <Tabs
                    sx={{ display: 'flex', alignItems: 'center', height: '48px' }}
                    value={value}
                    onChange={handleChange}
                    scrollButtons
                    variant="scrollable"
                    allowScrollButtonsMobile
                >
                    {tabs.map((item, i) => {
                        return (
                            <Tab
                                key={i}
                                sx={{ minHeight: '48px' }}
                                label={item.label}
                                icon={
                                    <Link key={item.id} to={`grid/${item.label.split(' ')[0]}`} id={'tab-link'}>
                                        {item.label}
                                    </Link>
                                }
                            />
                        );
                    })}
                    <Button
                        onClick={handleClick}
                        variant="outlined"
                        color="secondary"
                        sx={{ height: '25px', mt: '11px' }}
                    >
                        +
                    </Button>
                </Tabs>
            </Box>
            <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 0 40px' }}>
                Радары
            </Typography>
            <Link to={'radar-constructor'}>
                <Button variant="outlined" color="secondary" sx={{ textAlign: 'left', margin: '15px 0 15px 40px' }}>
                    Новый радар +
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
