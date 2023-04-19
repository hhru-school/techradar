import { FC, SyntheticEvent, useState } from 'react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Divider, Typography, Box, Container, Tab, Tabs, Button } from '@mui/material';

import MyRadarsDataGrid from './MyRadarsDataGrid/MyRadarsDataGrid';

type Tab = { id: number; label: string };

const tabs: Array<Tab> = [
    { id: 1, label: 'android' },
    { id: 2, label: 'backend' },
    { id: 3, label: 'data science' },
    { id: 4, label: 'frontend' },
    { id: 5, label: 'ios' },
    { id: 6, label: 'qa infrastructure' },
    { id: 7, label: 'datawarehouse' },
];

const MyRadar: FC = () => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                    aria-label="scrollable force tabs wrapped example"
                >
                    {tabs.map((item) => {
                        return (
                            <Tab
                                sx={{ minHeight: '48px' }}
                                label={item.label}
                                icon={
                                    <Link
                                        key={item.id}
                                        to={`grid/${item.label.split(' ')[0]}`}
                                        style={{
                                            margin: '0',
                                            width: '100%',
                                            height: '48px',
                                            position: 'absolute',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                }
                            />
                        );
                    })}
                    <Button variant="outlined" color="secondary" sx={{ height: '25px', mt: '11px' }}>
                        +
                    </Button>
                </Tabs>
            </Box>

            <Typography variant="h5" sx={{ textAlign: 'left', margin: '15px 0 0 40px' }}>
                Радары
            </Typography>
            <Button variant="outlined" color="secondary" sx={{ textAlign: 'left', margin: '15px 0 15px 40px' }}>
                Новый радар +
            </Button>
            <Divider />
            <Divider />
            <Routes>
                <Route path="/grid/:rowsId" element={<MyRadarsDataGrid />} />
            </Routes>
        </Container>
    );
};

export default MyRadar;
