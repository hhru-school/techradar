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
            </Routes>
        </>
    );
}

export default App;
