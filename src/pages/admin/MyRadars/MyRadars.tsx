import { FC, SyntheticEvent, useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Tab, Tabs, Button } from '@mui/material';

import { setRadarsCreateModalOpen } from '../../../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import MyRadarCreateModal from './MyRadarCreateModal/MyRadarCreateModal';
import MyRadarsDataGrid from './MyRadarsDataGrid/MyRadarsDataGrid';

import './MyRadars.less';

type Tab = { id: number; label: string };
type TabsList = Array<Tab>;

const MyRadar: FC = () => {
    const dispatch = useAppDispatch();
    const radarGrid = useAppSelector((state) => state.data.radarGrid);
    const showRadarsCreateModal = useAppSelector((state) => state.data.showRadarsCreateModal);

    const [tabsBtn, setTabsBtn] = useState<TabsList>([{ id: 1, label: 'ошибка' }]);
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const refreshTabs = useCallback(() => {
        const arrTabs = [];
        let count = 0;
        for (const key in radarGrid) {
            arrTabs.push({ id: count, label: key });
            count += 1;
        }
        setTabsBtn(arrTabs);
    }, [radarGrid]);

    useEffect(() => {
        refreshTabs();
    }, [radarGrid, refreshTabs]);

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
                    {tabsBtn.map((item, i) => {
                        return (
                            <Tab
                                key={i}
                                sx={{ minHeight: '48px' }}
                                label={item.label}
                                icon={
                                    <Link key={item.id} to={`grid/${item.label.split(' ')[0]}`} className="tab-link">
                                        {item.label}
                                    </Link>
                                }
                            />
                        );
                    })}
                    <Button
                        onClick={() => dispatch(setRadarsCreateModalOpen(true))}
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
