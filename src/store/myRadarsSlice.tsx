import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './mock';

export const myRadarsSlice = createSlice({
    name: 'myRadars',
    initialState,
    reducers: {
        setRadarsCreateModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showRadarsCreateModal = action.payload;
        },
    },
});

export const { setRadarsCreateModalOpen } = myRadarsSlice.actions;

export default myRadarsSlice.reducer;
