import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import Header from './components/header/Header';
import RequireAuth from './components/requireAuth.tsx/RequireAuth';
import Constructor from './pages/constructor/Constructor';
import Main from './pages/main/Main';
import TechSinglePage from './pages/techSinglePage/TechSinglePage';
import TechRadar from './pages/techradar/TechRadar';
import { ConstructorMode } from './store/editRadarSlice';
import { useCredentials } from './store/hooks';

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#363636',
            },

            secondary: {
                main: '#ffffff',
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
                <Route path="/*" element={<Main />}></Route>
                <Route path="/techradar">
                    <Route path="company/:companySlug/radar/:radarSlug/version/:versionSlug" element={<TechRadar />} />
                </Route>
                <Route path="/tech/:techId" element={<TechSinglePage />} />
                <Route path="/constructor">
                    <Route path="new/radar" element={<Constructor />} />
                    <Route
                        path="edit/version/:versionId"
                        element={<Constructor mode={ConstructorMode.VersionEditing} />}
                    />
                    <Route
                        path="new/version/radar/:radarId"
                        element={<Constructor mode={ConstructorMode.NewVersionCreation} />}
                    />
                </Route>
                <Route path="/admin/*" element={<RequireAuth />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
