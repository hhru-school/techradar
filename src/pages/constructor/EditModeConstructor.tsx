import { FC, useEffect } from 'react';
import { useParams } from 'react-router';

import { useGetAllRadarVersionsQuery, useGetRadarByVersionIdQuery } from '../../api/companyRadarsApi';
import { setEditRadarParams } from '../../store/editRadarSlice';
import { useAppDispatch } from '../../store/hooks';
import MainContainer from './MainContainer';
import { useCurrentRadar } from './hooks';

const EditModeConstructor: FC = () => {
    const { versionId } = useParams();

    const dispatch = useAppDispatch();

    const currentRadar = useCurrentRadar();

    const { data: radar } = useGetRadarByVersionIdQuery(Number(versionId));
    const { data: versions } = useGetAllRadarVersionsQuery(Number(radar?.id), { skip: !radar });

    const version = versions && versions.find((version) => version.id === Number(versionId));

    useEffect(() => {
        if (radar && version) {
            dispatch(setEditRadarParams({ radar, radarName: 'xxxxxx', radarVersion: version.name, radarId: radar.id }));
        }
    }, [dispatch, radar, version]);

    return <>{radar && version && <MainContainer radar={currentRadar} />}</>;
};

export default EditModeConstructor;
