import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import {
    useGetBlipEventByIdQuery,
    useGetBlipEventsForRadarQuery,
    useGetRadarByBlipEventIdQuery,
} from '../../../api/companyRadarsApi';
import { cleanUp, setHasError, setRadar, setIsLoading, setBlipEvent, setRadarLog } from '../../../store/editRadarSlice';
import { useAppDispatch } from '../../../store/hooks';

const EventDisplayDispatcher: FC = () => {
    const dispatch = useAppDispatch();

    const { blipEventId } = useParams();

    const { data: log } = useGetBlipEventsForRadarQuery(Number(blipEventId) ?? skipToken);

    const {
        data: radar,
        isLoading: radarLoading,
        error: radarError,
    } = useGetRadarByBlipEventIdQuery(Number(blipEventId));

    const {
        data: blipEvent,
        isLoading: blipEventLoading,
        error: blipEventError,
    } = useGetBlipEventByIdQuery(Number(blipEventId));

    const isLoading = radarLoading || blipEventLoading;
    const hasError = Boolean(radarError || blipEventError);

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
        dispatch(setHasError(hasError));
        if (radar) {
            dispatch(setRadar(radar));
        }
        if (blipEvent) {
            dispatch(setBlipEvent(blipEvent));
        }
        if (log) {
            dispatch(setRadarLog(log));
        }

        return () => {
            dispatch(cleanUp());
        };
    }, [dispatch, isLoading, radar, hasError, blipEvent, log]);

    return null;
};

export default EventDisplayDispatcher;
