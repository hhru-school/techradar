import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import About from './components/About/About';
import Header from './components/Header/Header';
import MyRadar from './pages/admin/MyRadar/MyRadar';
import MyTechnologies from './pages/admin/MyTechnologies/MyTechnologies';
import RadarConstructor from './pages/admin/RadarConstructor/RadarConstructor';
import TechConstructor from './pages/admin/TechConstructor/TechConstructor';
import Main from './pages/main/Main';
import TechRadar from './pages/techradar/TechRadar';

const App: FC = () => {
    const theme = createTheme(
        {
            palette: {
                primary: {
                    main: '#363636',
                },
            },
        },
        {
            components: {
                MuiDataGrid: {
                    defaultProps: {
                        localeText: ruRU,
                    },
                },
            },
        }
    );

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/techradar">
                    <Route path=":company/:category/:radar" element={<TechRadar />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/my-radars" element={<MyRadar />} />
                <Route path="/my-radars/radar-constructor" element={<RadarConstructor />} />
                <Route path="/my-tech" element={<MyTechnologies />} />
                <Route path="/my-tech/tech-constructor" element={<TechConstructor />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
