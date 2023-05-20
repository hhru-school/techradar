import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServerResponse } from '../api/authApi';
import { RootState } from './store';

interface AuthState {
    showAuthForm: boolean;
    showRegistrForm: boolean;
    username: string | null;
    password: string | null;
    tokenAccess: string | null;
    refreshToken: string | null;
}

const initAuthState: AuthState = {
    showAuthForm: false,
    showRegistrForm: false,
    username: null,
    password: null,
    tokenAccess: null,
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
            { payload: { username, tokenAccess, refreshToken } }: PayloadAction<ServerResponse>
        ) => {
            state.username = username;
            state.tokenAccess = tokenAccess;
            state.refreshToken = refreshToken;
            if (typeof username === 'string' && typeof refreshToken === 'string' && typeof refreshToken === 'string') {
                localStorage.setItem('username', username);
                localStorage.setItem('tokenAccess', refreshToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
        },
        logOut: (state) => {
            state.username = null;
            state.tokenAccess = null;
            state.refreshToken = null;
            localStorage.clear();
        },
    },
});

export const { setAuthFormOpen, setCredentials, logOut, setRegistrFormOpen } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): string | null => state.auth.username;
export const selectCurrentAccessToken = (state: RootState): string | null => state.auth.tokenAccess;
export const selectCurrentRefreshToken = (state: RootState): string | null => state.auth.refreshToken;
