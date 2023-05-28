import { useCallback, useEffect, useState } from 'react';

import {
    useCreateBlipEventMutation,
    useCreateBlipMutation,
    useGetRadarByVersionIdQuery,
    useUpdateVersionMutation,
} from '../../api/companyRadarsApi';
import { CreateBlipEventApiRequest, buildBlipEventRequest } from '../../api/radarApiUtils';
import { Blip } from '../../components/radar/types';
import { Segment, setRadar, setVersion } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface EditRadarMutationState {
    isLoading: boolean;
    hasError: boolean;
}

export enum OperationType {
    Move,
    Add,
    Delete,
}

type OperationHandler = (blip: Blip, distSegment?: Segment) => Promise<void>;

export const useOperationHandler = (operation: OperationType): [EditRadarMutationState, OperationHandler] => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState<EditRadarMutationState>({ isLoading: false, hasError: false });

    const parentId = useAppSelector((state) => state.editRadar.version?.blipEventId);
    const radarId = useAppSelector((state) => state.editRadar.radar.id);
    const version = useAppSelector((state) => state.editRadar.version);

    const [createBlip] = useCreateBlipMutation();
    const [createBlipEvent] = useCreateBlipEventMutation();
    const [updateVersion, { isSuccess: isUpdateVersionSuccess }] = useUpdateVersionMutation();
    const { data: radar } = useGetRadarByVersionIdQuery(version?.id ?? -1, {
        skip: !isUpdateVersionSuccess,
    });

    useEffect(() => {
        if (radar && version) {
            dispatch(setRadar({ radar, version }));
        }
    }, [dispatch, radar, version]);

    const handler = useCallback(
        async (blip: Blip, distSegment?: Segment) => {
            try {
                if (!parentId || !version || !radarId) throw new Error();
                setState({ isLoading: true, hasError: false });
                let blipEventRequest: CreateBlipEventApiRequest = buildBlipEventRequest(blip, parentId);
                if (operation === OperationType.Add) {
                    const newBlipResp = await createBlip({ blip, radarId }).unwrap();
                    blipEventRequest = { ...blipEventRequest, blipId: newBlipResp.id };
                }
                if (operation === OperationType.Move) {
                    const segment = distSegment as Segment;
                    blipEventRequest = { ...blipEventRequest, ringId: segment.ring.id, quadrantId: segment.sector.id };
                }
                if (operation === OperationType.Delete) {
                    blipEventRequest = { ...blipEventRequest, ringId: null, quadrantId: null };
                }

                const blipEvent = await createBlipEvent(blipEventRequest).unwrap();
                const updatedVersion = await updateVersion({ ...version, blipEventId: blipEvent.id }).unwrap();
                dispatch(setVersion(updatedVersion));
                setState({ isLoading: false, hasError: false });
            } catch (error) {
                console.error('Blip operation error');
                setState({ isLoading: false, hasError: true });
            }
        },
        [setState, createBlip, createBlipEvent, updateVersion, parentId, version, dispatch, operation, radarId]
    );

    return [state, handler];
};
