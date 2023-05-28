import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useGetAllRadarVersionsQuery, useGetRadarByVersionIdQuery } from '../../../api/companyRadarsApi';
import { VersionApiResponse } from '../../../api/radarApiUtils';
import { cleanUp, setHasError, setRadar, setIsLoading } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';

const getLastVersion = (versions: VersionApiResponse[]): VersionApiResponse =>
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
            if (radar && lastVersion) {
                dispatch(setRadar({ radar, version: lastVersion }));
            }
        }
        return () => {
            dispatch(cleanUp());
        };
    }, [dispatch, versions, isLoading, hasError, radar, lastVersion]);

    return null;
};

export default CreateNewVersionDispatcher;
