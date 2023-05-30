import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import Header from './components/header/Header';
import RequireAuth from './components/requireAuth.tsx/RequireAuth';
import MyRadars from './pages/admin/myRadars/MyRadars';
import RadarConstructor from './pages/admin/radarConstructor/RadarConstructor';
import TechSinglePage from './pages/admin/techSinglePage/TechSinglePage';
import Constructor from './pages/constructor/Constructor';
import TechRadar from './pages/techradar/TechRadar';
import { useCredentials } from './store/hooks';

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
    useCredentials();

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Routes>
                <Route path="/techradar">
                    <Route path=":companyId/:radarId" element={<TechRadar />} />
                </Route>
                <Route path="/my-radars/*" element={<MyRadars />} />
                <Route path="/constructor" element={<Constructor />} />
                <Route path="/single" element={<TechSinglePage />} />
                <Route path="/my-radars/radar-constructor" element={<RadarConstructor />} />
                <Route path="/admin/*" element={<RequireAuth />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
