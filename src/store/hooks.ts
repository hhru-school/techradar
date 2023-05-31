import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { ServerResponse } from '../api/types';
import { setCredentials } from './authSlice/authSlice';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCredentials: () => void = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        let user: string | null = null;

        try {
            user = localStorage.getItem('user');
        } catch (e) {
            throw new Error((e as Error).message);
        }

        if (user) {
            dispatch(setCredentials(JSON.parse(user) as ServerResponse));
        }
    }, [dispatch]);
};
