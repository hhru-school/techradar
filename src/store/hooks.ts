import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from './store';

type User = { username: string | null };

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = (): User => {
    const username = useSelector((state: RootState) => state.auth.username);
    return useMemo(() => ({ username }), [username]);
};
