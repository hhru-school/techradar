import { clearActiveBlip } from '../../store/activeBlipSlice';
import { drop } from '../../store/editRadarSlice';
import { store } from '../../store/store';

export const mouseUpHandler = (): void => {
    store.dispatch(drop());
    store.dispatch(clearActiveBlip());
    document.removeEventListener('mosedown', mouseUpHandler);
};
