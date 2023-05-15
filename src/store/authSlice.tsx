import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface AuthState {
    showAuthForm: boolean;
    username: string | null;
    password: string | null;
    tokenAccess: string | null;
    refreshToken: string | null;
}

const initAuthState: AuthState = {
    showAuthForm: false,
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
        setCredentials: (
            state,
            {
                payload: { username, tokenAccess, refreshToken },
            }: PayloadAction<{ username: string | null; tokenAccess: string | null; refreshToken: string | null }>
        ) => {
            state.username = username;
            state.tokenAccess = tokenAccess;
            state.refreshToken = refreshToken;
        },
        logOut: (state) => {
            state.username = null;
            state.tokenAccess = null;
            state.refreshToken = null;
        },
    },
});

export const { setAuthFormOpen, setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): string | null => state.auth.username;
export const selectCurrentAccessToken = (state: RootState): string | null => state.auth.tokenAccess;
export const selectCurrentRefreshToken = (state: RootState): string | null => state.auth.refreshToken;
