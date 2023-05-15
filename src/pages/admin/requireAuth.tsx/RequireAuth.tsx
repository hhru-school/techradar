import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../../store/hooks';
import MyRadars from '../myRadars/MyRadars';
import MyTechnologies from '../myTechnologies/MyTechnologies';
import RadarConstructor from '../radarConstructor/RadarConstructor';

const RequireAuth: FC = () => {
    const tokenAccess = useAppSelector((state) => state.auth.tokenAccess);

    const content = tokenAccess ? (
        <Routes>
            <Route path="/my-radars/*" element={<MyRadars />} />
            <Route path="radar-constructor" element={<RadarConstructor />} />
            <Route path="/my-tech" element={<MyTechnologies />} />
        </Routes>
    ) : null;

    return content;
};

export default RequireAuth;
