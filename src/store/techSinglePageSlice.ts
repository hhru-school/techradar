import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BlipResponse } from '../api/types';
import { initialState } from './mock';

export const techSinglePageSlice = createSlice({
    name: 'techSinglePage',
    initialState,
    reducers: {
        setEditTechModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showEditTechModal = action.payload;
        },
        setTechData: (state, action: PayloadAction<BlipResponse>) => {
            state.techData = action.payload;
        },
    },
});

export const { setEditTechModalOpen, setTechData } = techSinglePageSlice.actions;

export default techSinglePageSlice.reducer;
