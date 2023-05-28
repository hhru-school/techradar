import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetRadarByVersionIdQuery, useGetVersionByIdQuery } from '../../../api/companyRadarsApi';
import { cleanUp, setHasError, setRadar, setIsLoading } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';

const EditVersionDispatcher: FC = () => {
    const dispatch = useAppDispatch();

    const { versionId } = useParams();

    const {
        data: radar,
        isLoading: radarIsLoading,
        error: radarError,
    } = useGetRadarByVersionIdQuery(Number(versionId));
    const {
        data: version,
        isLoading: versionIsLoading,
        error: versionError,
    } = useGetVersionByIdQuery(Number(versionId));

    const isLoading = radarIsLoading || versionIsLoading;
    const hasError = Boolean(radarError || versionError);

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setHasError(hasError));
        if (radar && version) {
            dispatch(setRadar({ radar, version }));
        }

        return () => {
            dispatch(cleanUp());
        };
    }, [dispatch, isLoading, radar, version, hasError]);

    return null;
};

export default EditVersionDispatcher;
