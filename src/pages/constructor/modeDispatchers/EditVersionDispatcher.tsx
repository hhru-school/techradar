import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    useGetRadarByVersionIdQuery,
    useGetRadarLogQuery,
    useGetVersionByIdQuery,
} from '../../../api/companyRadarsApi';
import {
    cleanUp,
    setHasError,
    setRadar,
    setIsLoading,
    setRadarLog,
    setVersion,
    setEditMode,
    ConstructorMode,
} from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const EditVersionDispatcher: FC = () => {
    const dispatch = useAppDispatch();

    const { versionId } = useParams();

    const currentVersion = useAppSelector((state) => state.editRadar.version);

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

    const { data: log } = useGetRadarLogQuery(currentVersion.blipEventId, {
        skip: currentVersion.blipEventId < 0,
    });

    const isLoading = radarIsLoading || versionIsLoading;
    const hasError = Boolean(radarError || versionError);

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setHasError(hasError));
        dispatch(setEditMode(ConstructorMode.VersionEditing));
        if (version) {
            dispatch(setVersion(version));
        }
        if (radar) {
            dispatch(setRadar(radar));
        }
        if (log) {
            dispatch(setRadarLog(log));
        }
    }, [dispatch, isLoading, radar, version, hasError, log]);

    useEffect(
        () => () => {
            dispatch(cleanUp());
        },
        [dispatch]
    );

    return null;
};

export default EditVersionDispatcher;
