import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
    useGetBlipEventsForRadarQuery,
    useGetRadarByVersionIdQuery,
    useGetVersionByIdQuery,
} from '../../../api/companyRadarsApi';
import { cleanUp, setHasError, setRadar, setIsLoading, setRadarLog, setVersion } from '../../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const EditVersionDispatcher: FC = () => {
    const dispatch = useAppDispatch();

    const { versionId } = useParams();

    const currentVersrion = useAppSelector((state) => state.editRadar.version);

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

    const { data: log } = useGetBlipEventsForRadarQuery(currentVersrion.blipEventId, {
        skip: currentVersrion.blipEventId < 0,
    });

    const isLoading = radarIsLoading || versionIsLoading;
    const hasError = Boolean(radarError || versionError);

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setHasError(hasError));
        if (version) {
            dispatch(setVersion(version));
        }
        if (radar) {
            dispatch(setRadar(radar));
        }
        if (log) {
            dispatch(setRadarLog(log));
        }

        return () => {
            dispatch(cleanUp());
        };
    }, [dispatch, isLoading, radar, version, hasError, log]);

    return null;
};

export default memo(EditVersionDispatcher);
