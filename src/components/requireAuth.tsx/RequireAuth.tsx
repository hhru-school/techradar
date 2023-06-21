import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import MyRadars from '../../pages/admin/myRadars/MyRadars';
import Constructor from '../../pages/constructor/Constructor';
import { ConstructorMode } from '../../store/editRadarSlice';
import { useAppSelector } from '../../store/hooks';
import ErrorMessage from '../error/ErrorMessage';

const RequireAuth: FC = () => {
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    const content = accessToken ? (
        <Routes>
            <Route path="/my-radars/*" element={<MyRadars />}>
                <Route path="company/:companyId/grid/:paramRadarId" element={<MyRadars />} />
            </Route>
            {/* <Route path="/constructor"> */}
            <Route path="new/radar/company/:companyId" element={<Constructor />} />
            <Route path="edit/version/:versionId" element={<Constructor mode={ConstructorMode.VersionEditing} />} />
            <Route
                path="new/version/radar/:radarId"
                element={<Constructor mode={ConstructorMode.NewVersionCreation} />}
            />
            {/* </Route> */}
        </Routes>
    ) : (
        <ErrorMessage errorStatus={401} />
    );

    return content;
};

export default RequireAuth;
