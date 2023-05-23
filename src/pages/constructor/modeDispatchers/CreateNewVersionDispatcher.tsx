import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useGetAllRadarVersionsQuery, useGetRadarByVersionIdQuery } from '../../../api/companyRadarsApi';
import { RadarVersionApiResponse } from '../../../api/radarApiUtils';
import { cleanUp, setHasError, setInitialRadarAsset, setIsLoading } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';

const getLastVersion = (versions: RadarVersionApiResponse[]): RadarVersionApiResponse =>
    versions.sort((versionA, versionB) => versionB.creationTime.localeCompare(versionA.creationTime))[0];

const CreateNewVersionDispatcher: FC = () => {
    const dispatch = useAppDispatch();

    const { radarId } = useParams();
    const {
        data: versions,
        isLoading: versionsIsLoading,
        error: versionsError,
    } = useGetAllRadarVersionsQuery(Number(radarId));

    const lastVersion = versions && getLastVersion(versions);

    const {
        data: radar,
        isLoading: radarsIsLoading,
        error: radarError,
    } = useGetRadarByVersionIdQuery(lastVersion?.id ?? skipToken);

    const isLoading = versionsIsLoading || radarsIsLoading;
    const hasError = Boolean(versionsError) || Boolean(radarError);

    useEffect(() => {
        if (versions) {
            dispatch(setIsLoading(isLoading));
            dispatch(setHasError(hasError));
            if (radar) {
                dispatch(setInitialRadarAsset(radar));
            }
        }
        return () => {
            dispatch(cleanUp());
        };
    }, [dispatch, versions, isLoading, hasError, radar]);

    return null;
};

export default CreateNewVersionDispatcher;
