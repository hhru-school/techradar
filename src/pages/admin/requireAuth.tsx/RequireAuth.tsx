import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../../store/hooks';
import MyRadars from '../myRadars/MyRadars';
import MyTechnologies from '../myTechnologies/MyTechnologies';
import RadarConstructor from '../radarConstructor/RadarConstructor';

const RequireAuth: FC = () => {
    const token = useAppSelector((state) => state.auth.token);

    const content = token ? (
        <Routes>
            <Route path="/my-radars/*" element={<MyRadars />} />
            <Route path="radar-constructor" element={<RadarConstructor />} />
            <Route path="/my-tech" element={<MyTechnologies />} />
        </Routes>
    ) : null;

    return content;
};

export default RequireAuth;
