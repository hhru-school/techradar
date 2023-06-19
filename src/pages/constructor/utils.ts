import { IndexBlipEventApi, VersionApiResponse } from '../../api/types';
import { Blip } from '../../components/radar/types';
import { clearActiveBlip } from '../../store/activeBlipSlice';
import { IdToLabelDict, drop } from '../../store/editRadarSlice';
import { store } from '../../store/store';

export const mouseUpHandler = (): void => {
    store.dispatch(drop());
    store.dispatch(clearActiveBlip());
    document.removeEventListener('mosedown', mouseUpHandler);
};

interface LastBlipEvents {
    last: IndexBlipEventApi;
    preLast: IndexBlipEventApi | null;
}

export const getLastBlipEvents = (
    log: IndexBlipEventApi[] | null,
    currentVersion: VersionApiResponse,
    blip: Blip
): LastBlipEvents => {
    if (!log) throw new Error('Log not accepted');

    let last = null;
    let preLast = null;

    let flag = false;

    for (let i = log.length - 1; i >= 0; i--) {
        if (!last && log[i].blip?.id === blip.id && log[i].radarVersion === currentVersion.name) {
            last = { ...log[i] };
        }
        if (flag && log[i].blip?.id === blip.id) {
            preLast = { ...log[i] };
        }

        if (last) {
            flag = true;
        }
    }

    if (!last) throw new Error('Missing associated blipEvent');
    return { last, preLast };
};

export const getNextBlipLabel = (dict: IdToLabelDict | null): number => {
    if (!dict) return 1;
    return Math.max(...(Object.values(dict) as number[])) + 1;
};

export const getBlipEventStatus = (blipEvent: IndexBlipEventApi): string => {
    switch (blipEvent.drawInfo) {
        case 'NEW': {
            return 'Новая';
        }
        case 'BACKWARD': {
            return `от центра в ${blipEvent.ring?.name || ''}`;
        }
        case 'FORWARD': {
            return `к центру в ${blipEvent.ring?.name || ''}`;
        }
        case 'SEC_MOVE': {
            return `перемещена в сектор ${blipEvent.quadrant?.name || ''}`;
        }
        case 'FIXED': {
            return 'создана ранее';
        }
        case 'DELETE': {
            return 'удаление';
        }
        default:
            return 'неизвестно';
    }
};
