import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BlipResponse } from '../api/types';

interface State {
    showEditTechModal: boolean;
    techData: BlipResponse;
}

export const initialState: State = {
    showEditTechModal: false,
    techData: { name: 'Имя не указано', description: 'Описание не указано', id: 0, radarId: 0 },
};

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
