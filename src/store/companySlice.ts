import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateNewCompanyResponse } from '../api/types';

interface State {
    showCreateCompanyModal: boolean;
    currentCompany: null | CreateNewCompanyResponse;
}

export const initialState: State = {
    showCreateCompanyModal: false,
    currentCompany: { id: 1, name: 'dfd' },
};

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
