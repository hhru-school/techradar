import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Admin from './pages/admin/Admin';
import Main from './pages/main/Main';

function App(): JSX.Element {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/techradar" element={<TechRadar />} />
            </Routes>
        </>
    );
}

export default App;
