import { useCallback, useState } from 'react';

import {
    useCreateBlipEventMutation,
    useCreateBlipMutation,
    useDeleteBlipEventMutation,
    useUpdateBlipEventSegmentMutation,
    useUpdateVersionMutation,
} from '../../api/companyRadarsApi';
import { buildBlipEventRequest } from '../../api/radarApiUtils';
import { CreateBlipEventApiRequest, UpdateVersionRequest } from '../../api/types';
import { Blip } from '../../components/radar/types';
import { Segment, setNewBlipEventId, setVersion, updateDict } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLastBlipEvents, getNextBlipLabel } from './utils';

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
type OperationEditHandler = (args: { blip: Blip; comment: string; distSegment?: Segment }) => Promise<void>;

export const useOperationHandler = (
    operation: OperationType
): [EditRadarMutationState, OperationHandler, OperationEditHandler] => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState<EditRadarMutationState>({ isLoading: false, hasError: false });

    const radarId = useAppSelector((state) => state.editRadar.radar.id);
    const version = useAppSelector((state) => state.editRadar.version);
    const log = useAppSelector((state) => state.editRadar.log);
    const nextLabel = useAppSelector((state) => getNextBlipLabel(state.editRadar.idToLabelDict));

    const [createBlip] = useCreateBlipMutation();
    const [createBlipEvent] = useCreateBlipEventMutation();
    const [updateVersion] = useUpdateVersionMutation();

    const [updateBlipEvent] = useUpdateBlipEventSegmentMutation();
    const [deleteBlipEvent] = useDeleteBlipEventMutation();

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
                        dispatch(updateDict({ [newBlipResp.id]: nextLabel }));
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
        [setState, updateVersion, createBlip, createBlipEvent, version, dispatch, operation, radarId, nextLabel]
    );

    const editHandler: OperationEditHandler = useCallback(
        async ({ blip, comment, distSegment }) => {
            try {
                setState({ isLoading: true, hasError: false });
                const lastBlipEvents = getLastBlipEvents(log, version, blip);
                const isPreviosPosition =
                    lastBlipEvents.preLast &&
                    distSegment?.ring.id === lastBlipEvents.preLast.ring?.id &&
                    distSegment?.sector.id === lastBlipEvents.preLast.quadrant?.id;
                const updateBlipEventRequest = { id: lastBlipEvents.last.id, comment, segment: distSegment };
                const isNewBlip = blip.drawInfo === 'NEW';
                switch (operation) {
                    case OperationType.Move: {
                        if (isPreviosPosition) {
                            await deleteBlipEvent(lastBlipEvents.last.id);
                        } else {
                            await updateBlipEvent(updateBlipEventRequest);
                        }

                        break;
                    }
                    case OperationType.Delete: {
                        if (isNewBlip) {
                            await deleteBlipEvent(lastBlipEvents.last.id);
                        } else {
                            await updateBlipEvent(updateBlipEventRequest);
                        }
                        break;
                    }
                }

                setState({ isLoading: false, hasError: false });
            } catch (error) {
                console.error('Blip operation error');
                setState({ isLoading: false, hasError: true });
            }
        },
        [setState, version, operation, deleteBlipEvent, log, updateBlipEvent]
    );
    return [state, handler, editHandler];
};
