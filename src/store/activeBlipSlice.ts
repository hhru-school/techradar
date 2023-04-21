import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ActiveBlipState {
    id: number | null;
    openDescription: boolean;
}

const initialState: ActiveBlipState = { id: null, openDescription: false };

export const activeBlipSlice = createSlice({
    name: 'activeBlip',
    initialState,
    reducers: {
        setActiveBlip: (state, action: PayloadAction<number>) => ({ id: action.payload, openDescription: false }),
        setOpenDescription: (state, action: PayloadAction<boolean>) => ({ ...state, openDescription: action.payload }),
        clearActiveBlip: () => ({ id: null, openDescription: false }),
    },
});

export const { setActiveBlip, clearActiveBlip, setOpenDescription } = activeBlipSlice.actions;

export default activeBlipSlice.reducer;
