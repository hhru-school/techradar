import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import Header from './components/header/Header';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import MyRadars from './pages/admin/myRadars/MyRadars';
import MyTechnologies from './pages/admin/myTechnologies/MyTechnologies';
import RadarConstructor from './pages/admin/radarConstructor/RadarConstructor';
import TechSinglePage from './pages/admin/techSinglePage/TechSinglePage';
import Constructor from './pages/constructor/Constructor';
=======
=======
import RegistrationFormModal from './components/modals/registrationFormModal/RegistrationFormModal';
>>>>>>> ed4a96e (add registration modal)
=======
>>>>>>> e922e7d (arr error page and fix header)
import RequireAuth from './pages/admin/requireAuth.tsx/RequireAuth';
>>>>>>> fc6899b (fix tab bag, add RequireAuth)
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
                <Route path="/techradar">
                    <Route path=":companyId/:radarId" element={<TechRadar />} />
                </Route>
<<<<<<< HEAD
                <Route path="/my-radars/*" element={<MyRadars />} />
                <Route path="/constructor" element={<Constructor />} />
                <Route path="/single" element={<TechSinglePage />} />
                <Route path="/my-radars/radar-constructor" element={<RadarConstructor />} />
                <Route path="/my-tech" element={<MyTechnologies />} />
=======
>>>>>>> fc6899b (fix tab bag, add RequireAuth)
            </Routes>
            <RequireAuth />
        </ThemeProvider>
    );
};

export default App;
