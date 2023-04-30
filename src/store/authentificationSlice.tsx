import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState, AuthFormInputs } from './mock';

export const dataSlice = createSlice({
    name: 'authentification',
    initialState,
    reducers: {
        setAuthFormOpen: (state, action: PayloadAction<boolean>) => {
            state.showAuthentificationForm = action.payload;
        },
        setAuthFormData: (state, action: PayloadAction<AuthFormInputs>) => {
            state.authentificationFormData = action.payload;
        },
    },
});

export const { setAuthFormOpen, setAuthFormData } = dataSlice.actions;

export default dataSlice.reducer;
