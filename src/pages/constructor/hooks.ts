import { useCallback, useEffect, useState } from 'react';

import {
    useCreateBlipEventMutation,
    useCreateBlipMutation,
    useGetRadarByVersionIdQuery,
    useUpdateVersionMutation,
} from '../../api/companyRadarsApi';
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
                let currentBlip = blip;
                if (operation === OperationType.Add) {
                    const newBlipResp = await createBlip({ blip, radarId }).unwrap();
                    currentBlip = { ...blip, id: newBlipResp.id };
                }
                if (operation === OperationType.Move) {
                    const segment = distSegment as Segment;
                    currentBlip = { ...blip, ring: segment.ring, sector: segment.sector };
                }
                const blipEvent = await createBlipEvent({ blip: currentBlip, parentId }).unwrap();
                const updatedVersion = await updateVersion({ ...version, blipEventId: blipEvent.id }).unwrap();
                dispatch(setVersion(updatedVersion));
                setState({ isLoading: false, hasError: false });
            } catch (error) {
                console.error('Add new blip error');
                setState({ isLoading: false, hasError: true });
            }
        },
        [setState, createBlip, createBlipEvent, updateVersion, parentId, version, dispatch, operation, radarId]
    );

    return [state, handler];
};
