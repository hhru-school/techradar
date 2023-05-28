import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRadars from '../../pages/admin/myRadars/MyRadars';
import RadarConstructor from '../../pages/admin/radarConstructor/RadarConstructor';
import { useAppSelector } from '../../store/hooks';
import ErrorMessage from '../error/ErrorMessage';

const RequireAuth: FC = () => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    const content = accessToken ? (
        <Routes>
            <Route path="/my-radars/*" element={<MyRadars />} />
            <Route path="/radar-constructor" element={<RadarConstructor />} />
        </Routes>
    ) : (
        <ErrorMessage errorStatus={401} />
    );

    return content;
};

export default RequireAuth;
