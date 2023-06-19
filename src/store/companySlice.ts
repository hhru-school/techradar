import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompanyStaff } from '../api/companiesApi';
import { CreateNewCompanyResponse } from '../api/types';

interface State {
    showCreateCompanyModal: boolean;
    currentCompany: null | CreateNewCompanyResponse;
    showStaffModal: boolean;
    showSetStaffItemModal: boolean;
    showDeleteStaffItemModal: boolean;
    deleteStaffItemData: CompanyStaff | null;
    showCompanyModal: boolean;
}

export const initialState: State = {
    showCreateCompanyModal: false,
    currentCompany: null,
    showStaffModal: false,
    showSetStaffItemModal: false,
    showDeleteStaffItemModal: false,
    deleteStaffItemData: null,
    showCompanyModal: false,
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showCompanyModal = action.payload;
        },
        setCreateCompanyModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showCreateCompanyModal = action.payload;
        },
        setCurrentCompany: (state, action: PayloadAction<CreateNewCompanyResponse>) => {
            state.currentCompany = action.payload;
        },
        setStaffModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showStaffModal = action.payload;
        },
        setSetStaffItemModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showSetStaffItemModal = action.payload;
        },
        setDeleteStaffItemModalOpen: (
            state,
            action: PayloadAction<{ show: boolean; username: CompanyStaff | null }>
        ) => {
            state.showDeleteStaffItemModal = action.payload.show;
            state.deleteStaffItemData = action.payload.username;
        },
    },
});

export const {
    setCreateCompanyModalOpen,
    setCurrentCompany,
    setStaffModalOpen,
    setSetStaffItemModalOpen,
    setDeleteStaffItemModalOpen,
    setCompanyModalOpen,
} = companySlice.actions;

export default companySlice.reducer;
