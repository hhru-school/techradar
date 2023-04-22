import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './mock';

export const myRadarsSlice = createSlice({
    name: 'myRadars',
    initialState,
    reducers: {
        setRadarsCreateModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showRadarsCreateModal = action.payload;
        },
        createNewRadarSection: (state, action: PayloadAction<string>) => {
            state.radarGrid = {
                ...state.radarGrid,
                [action.payload]: [],
            };
        },
    },
});

export const { setRadarsCreateModalOpen, createNewRadarSection } = myRadarsSlice.actions;

export default myRadarsSlice.reducer;
