import { drop } from '../../store/editRadarSlice';
import { store } from '../../store/store';

export const mouseUpHandler = (): void => {
    store.dispatch(drop());
    document.removeEventListener('mosedown', mouseUpHandler);
};
