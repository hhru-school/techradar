import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateNewCompanyResponse } from '../api/types';
import { initialState } from './mock';

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCreateCompanyModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showCreateCompanyModal = action.payload;
        },
        setCurrentCompany: (state, action: PayloadAction<CreateNewCompanyResponse>) => {
            state.currentCompany = action.payload;
        },
    },
});

export const { setCreateCompanyModalOpen, setCurrentCompany } = companySlice.actions;

export default companySlice.reducer;
