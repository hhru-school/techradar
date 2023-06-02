import { FC, SyntheticEvent, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Tab, Tabs, Button, SxProps } from '@mui/material';

import { useGetAllCompanyRadarsQuery } from '../../../api/companyRadarsApi';
import MyRadarsDataGrid from './myRadarsDataGrid/MyRadarsDataGrid';

import './MyRadars.less';

const styles: Record<string, SxProps> = {
    tabs: { display: 'flex', alignItems: 'center', height: '48px' },
    tab: { minHeight: '48px' },
    newRadarBtn: { height: '25px', mt: '11px' },
    title: { textAlign: 'left', margin: '15px 0 0 40px' },
    newVersionBtn: { textAlign: 'left', margin: '15px 0 15px 40px' },
    box: { display: 'flex' },
};

type Tab = { id: number; label: string };

const MyRadar: FC = () => {
    const { data: allCompanyRadars } = useGetAllCompanyRadarsQuery(1);
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabsItems = useMemo(
        () =>
            allCompanyRadars &&
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
            }),
        [allCompanyRadars]
    );

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
            <Link to={`/constructor/new/version/radar/${value}`}>
                <Button variant="outlined" color="secondary" sx={styles.newVersionBtn}>
                    Сделать следующую версию +
                </Button>
            </Link>
            <Routes>
                <Route path="/grid/:radarId" element={<MyRadarsDataGrid />} />
            </Routes>
        </Container>
    );
};

export default MyRadar;
