import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ActiveSectorState {
    activeSectorName: string | null;
    hoveredSectorName: string | null;
}

const initialState: ActiveSectorState = { activeSectorName: null, hoveredSectorName: null };

export const activeSectorSlice = createSlice({
    name: 'activeSector',
    initialState,
    reducers: {
        setActiveSector: (state, action: PayloadAction<string>) => ({
            hoveredSectorName: null,
            activeSectorName: action.payload,
        }),

        setHoveredSector: (state, action: PayloadAction<string>) => ({
            ...state,
            hoveredSectorName: action.payload,
        }),
        disableHoveredSector: (state) => ({
            ...state,
            hoveredSectorName: null,
        }),
        clearActiveSector: () => ({ activeSectorName: null, hoveredSectorName: null }),
    },
});

export const { setActiveSector, setHoveredSector, disableHoveredSector, clearActiveSector } = activeSectorSlice.actions;

export default activeSectorSlice.reducer;
