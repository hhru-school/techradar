import { useCallback, useEffect, useState } from 'react';

import {
    useCreateBlipEventMutation,
    useCreateBlipMutation,
    useGetRadarByVersionIdQuery,
    useUpdateVersionMutation,
} from '../../api/companyRadarsApi';
import { Blip } from '../../components/radar/types';
import { closeCreateBlipModal, setRadar } from '../../store/editRadarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface EditRadarMutationState {
    isLoading: boolean;
    hasError: boolean;
}

type AddNewBlipFunc = (blip: Blip, radarId: number) => Promise<void>;

export const useAddNewBlipToRadar = (): [EditRadarMutationState, AddNewBlipFunc] => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState<EditRadarMutationState>({ isLoading: false, hasError: false });

    const parentId = useAppSelector((state) => state.editRadar.currentBlipEventId);
    const version = useAppSelector((state) => state.editRadar.version);

    const [createBlip] = useCreateBlipMutation();
    const [createBlipEvent] = useCreateBlipEventMutation();
    const [updateVersion, { isSuccess }] = useUpdateVersionMutation();
    const { data: radar } = useGetRadarByVersionIdQuery(version?.id ?? -1, { skip: !isSuccess });

    useEffect(() => {
        if (radar) {
            setRadar({ radar });
            dispatch(closeCreateBlipModal());
        }
    }, [radar, dispatch]);

    const addNewBlip = useCallback(
        async (blip: Blip, radarId: number) => {
            try {
                if (!parentId || !version) throw new Error();
                setState({ isLoading: true, hasError: false });
                const newBlipResp = await createBlip({ blip, radarId }).unwrap();
                const newBlip = { ...blip, id: newBlipResp.id };
                const blipEvent = await createBlipEvent({ blip: newBlip, parentId }).unwrap();
                await updateVersion({ ...version, blipEventId: blipEvent.id });
                setState({ isLoading: false, hasError: false });
            } catch (error) {
                console.error('add new blip error');
                setState({ isLoading: false, hasError: true });
            }
        },
        [setState, createBlip, createBlipEvent, updateVersion, parentId, version]
    );

    return [state, addNewBlip];
};
