import { useCallback, useState } from 'react';

import {
    useCreateBlipEventMutation,
    useCreateBlipMutation,
    useUpdateVersionMutation,
} from '../../api/companyRadarsApi';
import { buildBlipEventRequest } from '../../api/radarApiUtils';
import { CreateBlipEventApiRequest, UpdateVersionRequest } from '../../api/types';
import { Blip } from '../../components/radar/types';
import { Segment, setNewBlipEventId, setVersion } from '../../store/editRadarSlice';
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

type OperationHandler = (blip: Blip, comment: string, distSegment?: Segment) => Promise<void>;

export const useOperationHandler = (operation: OperationType): [EditRadarMutationState, OperationHandler] => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState<EditRadarMutationState>({ isLoading: false, hasError: false });

    const radarId = useAppSelector((state) => state.editRadar.radar.id);
    const version = useAppSelector((state) => state.editRadar.version);

    const [createBlip] = useCreateBlipMutation();
    const [createBlipEvent] = useCreateBlipEventMutation();
    const [updateVersion] = useUpdateVersionMutation();

    const handler = useCallback(
        async (blip: Blip, comment: string, distSegment?: Segment) => {
            try {
                setState({ isLoading: true, hasError: false });
                let blipEventRequest: CreateBlipEventApiRequest = buildBlipEventRequest(
                    blip,
                    version.blipEventId,
                    comment,
                    radarId
                );
                switch (operation) {
                    case OperationType.Add: {
                        const newBlipResp = await createBlip({ blip, radarId }).unwrap();
                        blipEventRequest = { ...blipEventRequest, blipId: newBlipResp.id };
                        break;
                    }
                    case OperationType.Move: {
                        const segment = distSegment as Segment;
                        blipEventRequest = {
                            ...blipEventRequest,
                            ringId: segment.ring.id,
                            quadrantId: segment.sector.id,
                        };
                        break;
                    }
                    case OperationType.Delete: {
                        blipEventRequest = { ...blipEventRequest, ringId: null, quadrantId: null };
                        break;
                    }
                }

                const blipEvent = await createBlipEvent({ body: blipEventRequest, versionId: version.id }).unwrap();
                dispatch(setNewBlipEventId(blipEvent.id));
                const versionRequest: UpdateVersionRequest = {
                    id: version.id,
                    name: version.name,
                    blipEventId: blipEvent.id,
                };
                const updatedVersion = await updateVersion(versionRequest).unwrap();
                dispatch(setVersion(updatedVersion));
                setState({ isLoading: false, hasError: false });
            } catch (error) {
                console.error('Blip operation error');
                setState({ isLoading: false, hasError: true });
            }
        },
        [setState, updateVersion, createBlip, createBlipEvent, version, dispatch, operation, radarId]
    );
    return [state, handler];
};
