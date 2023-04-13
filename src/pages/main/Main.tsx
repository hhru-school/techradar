import { FC, SyntheticEvent, useState, ReactNode } from 'react';
import { Divider, Box, Container, Tab, Tabs, Typography } from '@mui/material';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const Main: FC = () => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="xl" style={{ paddingTop: 16 }}>
            <Typography variant="h3" component="h3" align={'center'} gutterBottom>
                HeadHunter (hh.ru)
            </Typography>
            <Divider />

            <Box sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    scrollButtons
                    variant="scrollable"
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs wrapped example"
                >
                    <Tab label="Android" />
                    <Tab label="Backend" />
                    <Tab label="Data Science" />
                    <Tab label="Frontend" />
                    <Tab label="IOS" />
                    <Tab label="QA Infrastructure" />
                    <Tab label="DataWarehouse" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                1
            </TabPanel>
            <TabPanel value={value} index={1}>
                2
            </TabPanel>
            <TabPanel value={value} index={2}>
                3
            </TabPanel>
            <TabPanel value={value} index={3}>
                4
            </TabPanel>
            <TabPanel value={value} index={4}>
                5
            </TabPanel>
            <TabPanel value={value} index={5}>
                6
            </TabPanel>
            <TabPanel value={value} index={6}>
                7
            </TabPanel>
        </Container>
    );
};

export default Main;
