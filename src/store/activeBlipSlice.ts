import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ActiveBlipState {
    id: number | null;
}

const initialState: ActiveBlipState = { id: null };

export const activeBlipSlice = createSlice({
    name: 'activeBlip',
    initialState,
    reducers: {
        setActiveBlip: (state, action: PayloadAction<number>) => ({ id: action.payload }),
        clearActiveBlip: () => ({ id: null }),
    },
});

export const { setActiveBlip, clearActiveBlip } = activeBlipSlice.actions;

export default activeBlipSlice.reducer;
