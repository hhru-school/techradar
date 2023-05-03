import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Blip } from '../components/radar/types';
import { AddTechModalData } from '../pages/admin/radarConstructor/addTechModal/AddTechModal';
import { initialState } from './mock';

export const constructorRadarSlice = createSlice({
    name: 'constructorRadar',
    initialState,
    reducers: {
        setRadarConstrTechModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showRadarConstrTechModal = action.payload;
        },
        updateRingCount: (state, action: PayloadAction<number>) => {
            state.countRingInputs = action.payload;
        },
        updateSectorCount: (state, action: PayloadAction<number>) => {
            state.countSectorInputs = action.payload;
        },

        updateRingNames: (state, action: PayloadAction<{ id: number; value: string }>) => {
            state.ringNames[action.payload.id] = action.payload.value;
        },

        updateSectorNames: (state, action: PayloadAction<{ id: number; value: string }>) => {
            state.sectorNames[action.payload.id] = action.payload.value;
        },

        updateBlips: (state, action: PayloadAction<Blip[]>) => {
            state.blips = action.payload;
        },

        addNewBlip: (state, action: PayloadAction<AddTechModalData>) => {
            state.blips.push({ id: state.blips.length, description: null, ...action.payload });
        },
    },
});

export const {
    updateRingCount,
    updateSectorCount,
    setRadarConstrTechModalOpen,
    updateRingNames,
    updateSectorNames,
    updateBlips,
    addNewBlip,
} = constructorRadarSlice.actions;

export default constructorRadarSlice.reducer;
