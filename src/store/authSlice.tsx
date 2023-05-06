import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface AuthState {
    showAuthForm: boolean;
    user: string | null;
    password: string | null;
    token: string | null;
}

const initAuthState: AuthState = {
    showAuthForm: false,
    user: null,
    password: null,
    token: null,
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
            { payload: { user, token } }: PayloadAction<{ user: string | null; token: string | null }>
        ) => {
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setAuthFormOpen, setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): string | null => state.auth.user;
export const selectCurrentToken = (state: RootState): string | null => state.auth.token;
