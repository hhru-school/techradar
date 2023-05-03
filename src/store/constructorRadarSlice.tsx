import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    GridRadarConstructor,
    RowRadarConstructor,
} from '../pages/admin/radarConstructor/radarConstructorGrid/RadarConstructorGrid';
import { initialState } from './mock';

export const constructorRadarSlice = createSlice({
    name: 'constructorRadar',
    initialState,
    reducers: {
        setRadarConstrTechModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showRadarConstrTechModal = action.payload;
        },
        updateRadarConstrGrid: (state, action: PayloadAction<GridRadarConstructor>) => {
            state.radarConstructorGrid = action.payload;
        },
        updateRingCount: (state, action: PayloadAction<number>) => {
            state.countRingInputs = action.payload;
        },
        updateSectorCount: (state, action: PayloadAction<number>) => {
            state.countSectorInputs = action.payload;
        },
        updateRadarConstrTechGrid: (state, action: PayloadAction<RowRadarConstructor>) => {
            state.radarConstructorGrid = [...state.radarConstructorGrid, action.payload];
        },
    },
});

export const {
    updateRadarConstrGrid,
    updateRingCount,
    updateSectorCount,
    setRadarConstrTechModalOpen,
    updateRadarConstrTechGrid,
} = constructorRadarSlice.actions;

export default constructorRadarSlice.reducer;
