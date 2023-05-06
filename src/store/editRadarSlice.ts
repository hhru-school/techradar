import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { generateData } from '../components/radar/testData';
import { Blip } from '../components/radar/types';

interface Segment {
    sectorName: string;
    ringName: string;
}

interface EditingBlipGeometry {
    id: number;
    x: number;
    y: number;
    r: number;
}

type EditingBlipData = EditingBlipGeometry & Blip;

interface EditRadarState {
    isDragging: boolean;
    editingBlip: Blip | null;
    editingBlipData: EditingBlipData | null;
    editingBlipGeometry: EditingBlipGeometry | null;
    activeSegment: Segment | null;
    blips: Blip[];
}

const initialState: EditRadarState = {
    isDragging: false,
    editingBlip: null,
    editingBlipData: null,
    activeSegment: null,
    editingBlipGeometry: null,
    blips: generateData(10),
};

const getBlip = (state: EditRadarState): Blip | null => {
    return state.blips.find((blip) => blip.id === state.editingBlipGeometry?.id) || null;
};

export const editRadarSlice = createSlice({
    name: 'editRadar',
    initialState,
    reducers: {
        setIsDragging: (state, action: PayloadAction<boolean>) => {
            state.isDragging = action.payload;
        },

        setActiveSegment: (state, action: PayloadAction<Segment>) => {
            state.activeSegment = action.payload;
        },

        clearActiveSegment: (state) => {
            state.activeSegment = null;
        },

        setDraggingBlip: (state, action: PayloadAction<EditingBlipGeometry>) => {
            state.editingBlipGeometry = action.payload;
            state.editingBlip = getBlip(state);
            state.isDragging = true;
        },

        dropBlipToSegment: (state, action: PayloadAction<Segment | null>) => {
            const blip = state.blips.find((blip) => blip.id === state.editingBlipGeometry?.id);

            if (state.editingBlipGeometry && blip) {
                state.blips = state.blips.filter((blip) => blip.id !== state.editingBlipGeometry?.id);

                if (action.payload) {
                    state.blips.push({ ...blip, ...action.payload });
                }
            }
            state.editingBlipGeometry = null;
            state.editingBlip = null;
            state.isDragging = false;
        },
    },
});

export const { setIsDragging, setActiveSegment, clearActiveSegment, setDraggingBlip, dropBlipToSegment } =
    editRadarSlice.actions;

export default editRadarSlice.reducer;
