import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ActiveSectorState {
    activeSectorId: number | null;
    hoveredSectorId: number | null;
    isTransforming: boolean;
}

const initialState: ActiveSectorState = { activeSectorId: null, hoveredSectorId: null, isTransforming: false };

export const activeSectorSlice = createSlice({
    name: 'activeSector',
    initialState,
    reducers: {
        setActiveSector: (state, action: PayloadAction<number>) => {
            state.hoveredSectorId = null;
            state.isTransforming = state.activeSectorId !== action.payload;
            state.activeSectorId = action.payload;
        },

        setHoveredSector: (state, action: PayloadAction<number>) => {
            state.hoveredSectorId = action.payload;
        },
        clearHoveredSector: (state) => {
            state.hoveredSectorId = null;
        },

        setIsTransforming: (state, action: PayloadAction<boolean>) => {
            state.isTransforming = action.payload;
        },

        clearActiveSector: (state) => {
            state.activeSectorId = null;
            state.hoveredSectorId = null;
            state.isTransforming = false;
        },
    },
});

export const { setActiveSector, setHoveredSector, clearHoveredSector, clearActiveSector, setIsTransforming } =
    activeSectorSlice.actions;

export default activeSectorSlice.reducer;
