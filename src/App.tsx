import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, SxProps, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import RequireAuth from './components/requireAuth.tsx/RequireAuth';
import Main from './pages/main/Main';
import TechSinglePage from './pages/techSinglePage/TechSinglePage';
import TechRadar from './pages/techradar/TechRadar';
import { ConstructorMode } from './store/editRadarSlice';
import { useCredentials, useCurrentCompany } from './store/hooks';

const styles: Record<string, SxProps> = {
    box: { padding: '0 0 80px 0', position: 'relative', minHeight: 'calc(100vh - 70px)' },
};

const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#363636',
            },

            secondary: {
                main: '#ffffff',
            },

            success: {
                main: '#1785e5',
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
    useCurrentCompany();

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.box}>
                <Header />
                <Routes>
                    <Route path="/*" element={<Main />}></Route>
                    <Route path="/techradar">
                        <Route
                            path="company/:companySlug/radar/:radarSlug/version/:versionSlug"
                            element={<TechRadar />}
                        />
                    </Route>
                    <Route path="/tech/:techId" element={<TechSinglePage />} />
                    <Route path="/admin/*" element={<RequireAuth />} />
                    <Route path="/constructor/*" element={<RequireAuth />} />
                </Routes>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};

export default App;
