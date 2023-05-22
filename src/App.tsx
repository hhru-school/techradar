import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import Header from './components/header/Header';
import MyRadars from './pages/admin/myRadars/MyRadars';
import MyTechnologies from './pages/admin/myTechnologies/MyTechnologies';
import RadarConstructor from './pages/admin/radarConstructor/RadarConstructor';
import Constructor from './pages/constructor/Constructor';
import TechRadar from './pages/techradar/TechRadar';

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#363636',
            },

            secondary: {
                main: '#63539F',
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

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Routes>
                <Route path="/techradar">
                    <Route path=":companySlug/:radarSlug/:versionSlug" element={<TechRadar />} />
                </Route>
                <Route path="/my-radars/*" element={<MyRadars />} />
                <Route path="/constructor" element={<Constructor />}>
                    <Route path=":versionSlug" element={<Constructor />} />
                </Route>
                <Route path="/my-radars/radar-constructor" element={<RadarConstructor />} />
                <Route path="/my-tech" element={<MyTechnologies />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
