import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { setCredentials } from './authSlice/authSlice';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCredentials = (): (() => void) => {
    const dispatch = useAppDispatch();

    const localStorageGetCreds = () => {
        if (
            localStorage.getItem('username') &&
            localStorage.getItem('accessToken') &&
            localStorage.getItem('refreshToken')
        ) {
            dispatch(
                setCredentials({
                    username: localStorage.getItem('username'),
                    accessToken: localStorage.getItem('accessToken'),
                    refreshToken: localStorage.getItem('refreshToken'),
                })
            );
        }
    };

    return localStorageGetCreds;
};
