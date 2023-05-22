import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import Header from './components/header/Header';
import MyRadars from './pages/admin/myRadars/MyRadars';
import RadarConstructor from './pages/admin/radarConstructor/RadarConstructor';
import RequireAuth from './pages/admin/requireAuth.tsx/RequireAuth';
import TechSinglePage from './pages/admin/techSinglePage/TechSinglePage';
import Constructor from './pages/constructor/Constructor';
import TechRadar from './pages/techradar/TechRadar';
import { setCredentials } from './store/authSlice';
import { useAppDispatch } from './store/hooks';

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
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            localStorage.getItem('username') &&
            localStorage.getItem('tokenAccess') &&
            localStorage.getItem('refreshToken')
        ) {
            dispatch(
                setCredentials({
                    username: localStorage.getItem('username'),
                    tokenAccess: localStorage.getItem('tokenAccess'),
                    refreshToken: localStorage.getItem('refreshToken'),
                })
            );
        }
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Routes>
                <Route path="/1/1" element={<TechRadar />} />
                <Route path="/techradar">
                    <Route path=":companySlug/:radarSlug/:versionSlug" element={<TechRadar />} />
                </Route>
                <Route path="/my-radars/*" element={<MyRadars />} />
                <Route path="/constructor">
                    <Route path="new" element={<Constructor />} />
                    <Route path="edit/:versionSlug" element={<Constructor mode="edit" />} />
                </Route>
                <Route path="/my-radars/radar-constructor" element={<RadarConstructor />} />
                <Route path="/admin/*" element={<RequireAuth />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
