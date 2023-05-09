import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { generateData, sectorNames, ringNames } from '../components/radar/testData';
import { Blip } from '../components/radar/types';

interface Segment {
    sectorName: string;
    ringName: string;
}

interface EditingBlipAsset {
    id: number;
    label?: string;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    r: number;
}

export enum EventSuggest {
    Delete = 'delete',
    Add = 'add',
    Move = 'move',
    NotAllowed = 'notAllowed',
}

interface EditRadarState {
    isDragging: boolean;
    blip: Blip | null;
    blipAsset: EditingBlipAsset | null;
    activeSegment: Segment | null;
    blips: Blip[];
    eventSuggest: EventSuggest | null;
    isCreating: boolean;
    showCreateBlipModal: boolean;
    showMoveBlipModal: boolean;
    showDeleteBlipModal: boolean;
    showEditSectorNameModal: boolean;
    showEditRingNameModal: boolean;
    editingSectorName: string | null;
    editingRingName: string | null;
    sectorNames: string[];
    ringNames: string[];
}

const initialState: EditRadarState = {
    isDragging: false,
    blip: null,
    blipAsset: null,
    activeSegment: null,
    blips: generateData(4),
    eventSuggest: null,
    isCreating: false,
    showCreateBlipModal: false,
    showMoveBlipModal: false,
    showDeleteBlipModal: false,
    showEditSectorNameModal: false,
    editingSectorName: null,
    editingRingName: null,
    // mock
    sectorNames,
    ringNames,
    showEditRingNameModal: false,
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

const renameItemByName = (arr: string[], oldName: string, newName: string) => {
    arr[arr.indexOf(oldName)] = newName;
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
            if (state.isCreating) {
                state.eventSuggest = EventSuggest.Add;
            } else if (state.blip) {
                if (
                    state.blip.ringName !== state.activeSegment.ringName ||
                    state.blip.sectorName !== state.activeSegment.sectorName
                ) {
                    state.eventSuggest = EventSuggest.Move;
                } else {
                    state.eventSuggest = null;
                }
            }
        },

        clearActiveSegment: (state) => {
            state.activeSegment = null;
            if (state.blip) {
                state.eventSuggest = EventSuggest.Delete;
            }
            if (state.isCreating) {
                state.eventSuggest = EventSuggest.NotAllowed;
            }
        },

        setDraggingBlip: (state, action: PayloadAction<EditingBlipAsset>) => {
            state.blipAsset = action.payload;
            state.blip = getBlipById(state, action.payload.id);
            state.isDragging = true;
        },

        setIsCreating: (state) => {
            state.isCreating = true;
            if (!state.activeSegment) {
                state.eventSuggest = EventSuggest.NotAllowed;
            }
        },

        drop: (state) => {
            if (state.blip) {
                switch (state.eventSuggest) {
                    case EventSuggest.Move: {
                        state.showMoveBlipModal = true;

                        break;
                    }
                    case EventSuggest.Delete: {
                        state.showDeleteBlipModal = true;
                    }
                }
            }

            if (state.isCreating && state.eventSuggest === EventSuggest.Add) {
                state.showCreateBlipModal = true;
            }

            state.eventSuggest = null;
            state.blipAsset = null;
            state.isDragging = false;
            state.isCreating = false;
        },

        closeCreateBlipModal: (state) => {
            state.showCreateBlipModal = false;
        },

        closeMoveBlipModal: (state) => {
            state.showMoveBlipModal = false;
        },

        closeDeleteBlipModal: (state) => {
            state.showDeleteBlipModal = false;
        },

        addNewBlip: (state, action: PayloadAction<Blip>) => {
            const maxId = Math.max(...state.blips.map((blip) => blip.id));
            state.blips.push({ ...action.payload, id: maxId + 1 });
            state.showCreateBlipModal = false;
            state.activeSegment = null;
        },

        moveBlip: (state) => {
            if (state.blip) {
                moveBlipTosegment(state, state.blip, state.activeSegment);
            }
            state.blip = null;
            state.showMoveBlipModal = false;
            state.activeSegment = null;
        },

        deleteBlip: (state) => {
            if (state.blip) {
                removeBlipById(state, state.blip.id);
            }
            state.showDeleteBlipModal = false;
        },

        openEditSectorNameModal: (state, action: PayloadAction<string>) => {
            state.showEditSectorNameModal = true;
            state.editingSectorName = action.payload;
        },

        closeEditSectorNameModal: (state) => {
            state.showEditSectorNameModal = false;
        },

        renameSector: (state, action: PayloadAction<string>) => {
            if (state.editingSectorName) {
                renameItemByName(state.sectorNames, state.editingSectorName, action.payload);
            }
            state.showEditSectorNameModal = false;
        },

        openEditRingNameModal: (state, action: PayloadAction<string>) => {
            state.showEditRingNameModal = true;
            state.editingRingName = action.payload;
        },

        closeEditRingNameModal: (state) => {
            state.showEditRingNameModal = false;
        },

        renameRing: (state, action: PayloadAction<string>) => {
            if (state.editingRingName) {
                renameItemByName(state.ringNames, state.editingRingName, action.payload);
            }
            state.showEditRingNameModal = false;
        },
    },
});

export const {
    setIsDragging,
    setActiveSegment,
    clearActiveSegment,
    setDraggingBlip,
    drop,
    setIsCreating,
    closeCreateBlipModal,
    closeMoveBlipModal,
    closeDeleteBlipModal,
    closeEditSectorNameModal,
    openEditSectorNameModal,
    addNewBlip,
    moveBlip,
    deleteBlip,
    renameSector,
    openEditRingNameModal,
    closeEditRingNameModal,
    renameRing,
} = editRadarSlice.actions;

export default editRadarSlice.reducer;
