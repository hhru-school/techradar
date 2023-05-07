import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { generateData } from '../components/radar/testData';
import { Blip } from '../components/radar/types';

interface Segment {
    sectorName: string;
    ringName: string;
}

interface EditingBlipAsset {
    id: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    r: number;
}

export enum OnDropEvent {
    Delete = 'delete',
    Add = 'add',
    Move = 'move',
}

interface EditRadarState {
    isDragging: boolean;
    blip: Blip | null;
    blipAsset: EditingBlipAsset | null;
    activeSegment: Segment | null;
    blips: Blip[];
    onDropEvent: OnDropEvent | null;
}

const initialState: EditRadarState = {
    isDragging: false,
    blip: null,
    blipAsset: null,
    activeSegment: null,
    blips: generateData(4),
    onDropEvent: null,
};

const getBlipById = (state: EditRadarState, id: number): Blip | null => {
    return state.blips.find((blip) => blip.id === id) || null;
};

const removeBlipById = (state: EditRadarState, id: number) => {
    state.blips = state.blips.filter((blip) => blip.id !== id);
};

const moveBlipTosegment = (state: EditRadarState, blip: Blip, segment: Segment | null) => {
    if (!segment) return;
    removeBlipById(state, blip.id);
    state.blips.push({ ...blip, ringName: segment.ringName, sectorName: segment.sectorName });
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
            if (state.blip) {
                if (
                    state.blip.ringName !== state.activeSegment.ringName ||
                    state.blip.sectorName !== state.activeSegment.sectorName
                ) {
                    state.onDropEvent = OnDropEvent.Move;
                } else {
                    state.onDropEvent = null;
                }
            }
        },

        clearActiveSegment: (state) => {
            state.activeSegment = null;
            if (state.blip) {
                state.onDropEvent = OnDropEvent.Delete;
            }
        },

        setDraggingBlip: (state, action: PayloadAction<EditingBlipAsset>) => {
            state.blipAsset = action.payload;
            state.blip = getBlipById(state, action.payload.id);
            state.isDragging = true;
        },

        drop: (state) => {
            if (state.blip) {
                switch (state.onDropEvent) {
                    case OnDropEvent.Move: {
                        moveBlipTosegment(state, state.blip, state.activeSegment);
                        break;
                    }
                    case OnDropEvent.Delete: {
                        removeBlipById(state, state.blip.id);
                    }
                }
            }
            state.onDropEvent = null;
            state.blipAsset = null;
            state.blip = null;
            state.isDragging = false;
        },
    },
});

export const { setIsDragging, setActiveSegment, clearActiveSegment, setDraggingBlip, drop } = editRadarSlice.actions;

export default editRadarSlice.reducer;
