import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Bbox {
    top: number;
    bottom: number;
}

// interface ScrollOffest {
//     value: number;
//     position: 'top' | 'bottom';
// }

interface ActiveBlipState {
    id: number | null;
    openDescription: boolean;
    legendBbox: Bbox | null;
    scrollOffset: number;
}

const initialState: ActiveBlipState = { id: null, openDescription: false, legendBbox: null, scrollOffset: 0 };

export const activeBlipSlice = createSlice({
    name: 'activeBlip',
    initialState,
    reducers: {
        setActiveBlip: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
            state.openDescription = false;
        },
        setOpenDescription: (state, action: PayloadAction<boolean>) => {
            state.openDescription = action.payload;
        },
        clearActiveBlip: (state) => {
            state.id = null;
            state.openDescription = false;
        },

        setLegendBbox: (state, action: PayloadAction<Bbox>) => {
            state.legendBbox = action.payload;
        },

        setScrollOffset: (state, action: PayloadAction<number>) => {
            state.scrollOffset = action.payload;
        },
    },
});

export const { setActiveBlip, clearActiveBlip, setOpenDescription, setLegendBbox, setScrollOffset } =
    activeBlipSlice.actions;

export default activeBlipSlice.reducer;
