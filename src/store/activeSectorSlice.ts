import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ActiveSectorState {
    activeSectorName: string | null;
    hoveredSectorName: string | null;
    isTransforming: boolean;
}

const initialState: ActiveSectorState = { activeSectorName: null, hoveredSectorName: null, isTransforming: false };

export const activeSectorSlice = createSlice({
    name: 'activeSector',
    initialState,
    reducers: {
        setActiveSector: (state, action: PayloadAction<string>) => ({
            ...state,
            hoveredSectorName: null,
            activeSectorName: action.payload,
            isTransforming: !(state.activeSectorName === action.payload),
        }),

        setHoveredSector: (state, action: PayloadAction<string>) => ({
            ...state,
            hoveredSectorName: action.payload,
        }),
        clearHoveredSector: (state) => ({
            ...state,
            hoveredSectorName: null,
        }),

        setIsTransforming: (state, action: PayloadAction<boolean>) => ({ ...state, isTransforming: action.payload }),

        clearActiveSector: (state) => ({
            ...state,
            activeSectorName: null,
            hoveredSectorName: null,
            isTransforming: false,
        }),
    },
});

export const { setActiveSector, setHoveredSector, clearHoveredSector, clearActiveSector, setIsTransforming } =
    activeSectorSlice.actions;

export default activeSectorSlice.reducer;
