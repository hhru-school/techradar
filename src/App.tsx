import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './components/Header/Header';
import Account from './pages/admin/Account/Account';
import MyRadar from './pages/admin/MyRadar/MyRadar';
import RadarConstructor from './pages/admin/RadarConstructor/RadarConstructor';
import Main from './pages/main/Main';
import TechRadar from './pages/techradar/TechRadar';

const App: FC = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#363636',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/techradar">
                    <Route path=":company/:category/:radar" element={<TechRadar />} />
                </Route>
                <Route path="/account" element={<Account />} />
                <Route path="/radars" element={<MyRadar />} />
                <Route path="/constructor" element={<RadarConstructor />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
