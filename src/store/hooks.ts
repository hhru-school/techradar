import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from './store';

type User = { user: string | null };

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = (): User => {
    const user = useSelector((state: RootState) => state.auth.user);
    return useMemo(() => ({ user }), [user]);
};
