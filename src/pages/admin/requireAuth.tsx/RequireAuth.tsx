import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorMessage from '../../../components/error/ErrorMessage';
import { useAppSelector } from '../../../store/hooks';
import Constructor from '../../constructor/Constructor';
import MyRadars from '../myRadars/MyRadars';
// import RadarConstructor from '../radarConstructor/RadarConstructor';

const RequireAuth: FC = () => {
    const tokenAccess = useAppSelector((state) => state.auth.tokenAccess);

    const content = tokenAccess ? (
        <Routes>
            <Route path="/my-radars/*" element={<MyRadars />} />
            {/* <Route path="/constructor" element={<RadarConstructor />} /> */}
            <Route path="/constructor" element={<Constructor />} />
        </Routes>
    ) : (
        <ErrorMessage errorStatus={401} />
    );

    return content;
};

export default RequireAuth;
