import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ActiveSectorState {
    id: number | null;
}

const initialState: ActiveSectorState = { id: null };

export const activeSectorSlice = createSlice({
    name: 'activeSector',
    initialState,
    reducers: {
        setActiveSector: (state, action: PayloadAction<number>) => ({ id: action.payload }),
        clearActiveSector: () => ({ id: null }),
    },
});

export const { setActiveSector, clearActiveSector } = activeSectorSlice.actions;

export default activeSectorSlice.reducer;
