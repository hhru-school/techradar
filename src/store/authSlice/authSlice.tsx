import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServerResponse } from '../../api/types';
import { RootState } from '../store';
import { AuthState } from './types';

const initAuthState: AuthState = {
    showAuthForm: false,
    showRegistrForm: false,
    username: null,
    password: null,
    accessToken: null,
    refreshToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initAuthState,
    reducers: {
        setAuthFormOpen: (state, action: PayloadAction<boolean>) => {
            state.showAuthForm = action.payload;
        },
        setRegistrFormOpen: (state, action: PayloadAction<boolean>) => {
            state.showRegistrForm = action.payload;
        },
        setCredentials: (
            state,
            { payload: { username, accessToken, refreshToken } }: PayloadAction<ServerResponse>
        ) => {
            state.username = username;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        signOut: (state) => {
            state.username = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setAuthFormOpen, setCredentials, signOut, setRegistrFormOpen } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): string | null => state.auth.username;
export const selectCurrentAccessToken = (state: RootState): string | null => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState): string | null => state.auth.refreshToken;
