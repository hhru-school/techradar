import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';

import Header from './components/header/Header';
import MyRadars from './pages/admin/myRadars/MyRadars';
import MyTechnologies from './pages/admin/myTechnologies/MyTechnologies';
import RadarConstructor from './pages/admin/radarConstructor/RadarConstructor';
import TechSinglePage from './pages/admin/techSinglePage/TechSinglePage';
import Constructor from './pages/constructor/Constructor';
import TechRadar from './pages/techradar/TechRadar';
import { ConstructorMode } from './store/editRadarSlice';

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
                    <Route path="company/:companySlug/radar/:radarSlug/version/:versionSlug" element={<TechRadar />} />
                </Route>
                <Route path="/my-radars/*" element={<MyRadars />} />
                <Route path="/single" element={<TechSinglePage />} />
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
                    <Route path="event/:blipEventId" element={<Constructor mode={ConstructorMode.DisplayEvent} />} />
                </Route>
                <Route path="/my-radars/radar-constructor" element={<RadarConstructor />} />
                <Route path="/my-tech" element={<MyTechnologies />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
