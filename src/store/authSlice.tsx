import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthFormInputs {
    user: string | null;
    password: string | null;
}

interface AuthState {
    showAuthForm: boolean;
    authFormData: AuthFormInputs;
    user: string | null;
    password: string | null;
    token: string | null;
}

const initAuthState: AuthState = {
    authFormData: { user: null, password: null },
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
        setAuthFormData: (state, action: PayloadAction<AuthFormInputs>) => {
            state.authFormData = action.payload;
        },
        setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: string; token: string }>) => {
            state.user = user;
            state.token = token;
        },
    },
});

export const { setAuthFormOpen, setAuthFormData, setCredentials } = authSlice.actions;

export default authSlice.reducer;
