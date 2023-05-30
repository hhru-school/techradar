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
        const user: string | null = localStorage.getItem('user');
        if (user) {
            dispatch(setCredentials(JSON.parse(user) as ServerResponse));
        }
    }, [dispatch]);
};
