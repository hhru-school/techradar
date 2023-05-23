import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { BasicRadarData } from '../api/radarApiUtils';
import { Blip } from '../components/radar/types';
import {
    defaultRadarName,
    defaultRingNames,
    defaultSectorNames,
    defaultVersionName,
} from '../pages/constructor/config';

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

interface MoveBlipAsset {
    id: number;
    sectorName: string;
    ringName: string;
}

interface EditRadarInitialDataset {
    radarId: number;
    radarName: string;
    radarVersion: string;
    radar: BasicRadarData;
}

export enum EventSuggest {
    Delete = 'delete',
    Add = 'add',
    Move = 'move',
    NotAllowed = 'notAllowed',
    EditText = 'editText',
}

export enum EditMode {
    NewRadarCreation,
    NewVersionCreation,
    VersionEditing,
}

interface EditRadarState {
    blipEventId: number | null;
    mode: EditMode;
    radarId: number | null;
    radarName: string;
    radarVersion: string;
    isDragging: boolean;
    blip: Blip | null;
    blipAsset: EditingBlipAsset | null;
    activeSegment: Segment | null;
    blips: Blip[];
    eventSuggest: EventSuggest | null;
    isCreating: boolean;
    showCreateBlipModal: boolean;
    showEditBlipModal: boolean;
    showMoveBlipModal: boolean;
    showDeleteBlipModal: boolean;
    showEditSectorNameModal: boolean;
    showDeleteSectorModal: boolean;
    showEditRingNameModal: boolean;
    showDeleteRingModal: boolean;
    showAddNewSectorModal: boolean;
    showAddNewRingModal: boolean;
    showSaveRadarDialog: boolean;
    editingSectorName: string | null;
    editingRingName: string | null;
    sectorNames: string[];
    ringNames: string[];
    showEditIcon: boolean;
}

const initialState: EditRadarState = {
    blipEventId: null,
    mode: EditMode.NewRadarCreation,
    radarId: null,
    radarName: defaultRadarName,
    radarVersion: defaultVersionName,
    isDragging: false,
    blip: null,
    blipAsset: null,
    activeSegment: null,
    eventSuggest: null,
    isCreating: false,
    showCreateBlipModal: false,
    showEditBlipModal: false,
    showMoveBlipModal: false,
    showDeleteBlipModal: false,
    showEditSectorNameModal: false,
    showDeleteSectorModal: false,
    showEditRingNameModal: false,
    showDeleteRingModal: false,
    editingSectorName: null,
    editingRingName: null,
    showAddNewSectorModal: false,
    showAddNewRingModal: false,
    sectorNames: defaultSectorNames,
    ringNames: defaultRingNames,
    blips: [],

    showSaveRadarDialog: false,
    showEditIcon: false,
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

const repalceBlip = (state: EditRadarState, blip: Blip) => {
    removeBlipById(state, blip.id);
    state.blips.push(blip);
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

        openEditBlipModal: (state, action: PayloadAction<number>) => {
            state.blip = getBlipById(state, action.payload);
            state.showEditBlipModal = true;
        },

        closeEditBlipModal: (state) => {
            state.showEditBlipModal = false;
        },

        closeCreateBlipModal: (state) => {
            state.showCreateBlipModal = false;
        },

        openMoveBlipModal: (state, action: PayloadAction<MoveBlipAsset>) => {
            state.blip = getBlipById(state, action.payload.id);
            state.activeSegment = { sectorName: action.payload.sectorName, ringName: action.payload.ringName };
            state.showMoveBlipModal = true;
        },

        closeMoveBlipModal: (state) => {
            state.showMoveBlipModal = false;
        },

        openDeleteBlipModal: (state, action: PayloadAction<number>) => {
            state.blip = getBlipById(state, action.payload);
            state.showDeleteBlipModal = true;
        },

        closeDeleteBlipModal: (state) => {
            state.showDeleteBlipModal = false;
        },

        addNewBlip: (state, action: PayloadAction<Blip>) => {
            const maxId = state.blips.length > 0 ? Math.max(...state.blips.map((blip) => blip.id)) : 0;
            state.blips.push({ ...action.payload, id: maxId + 1 });
            state.showCreateBlipModal = false;
            state.activeSegment = null;
        },

        editBlip: (state, action: PayloadAction<Blip>) => {
            repalceBlip(state, action.payload);
            state.showEditBlipModal = false;
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

        openDeleteSectorModal: (state, action: PayloadAction<string>) => {
            state.editingSectorName = action.payload;
            state.showDeleteSectorModal = true;
        },

        closeDeleteSectorModal: (state) => {
            state.showDeleteSectorModal = false;
        },

        renameSector: (state, action: PayloadAction<string>) => {
            if (state.editingSectorName) {
                const oldName = state.editingSectorName;
                renameItemByName(state.sectorNames, state.editingSectorName, action.payload);
                state.blips = [
                    ...state.blips.map((blip) =>
                        blip.sectorName === oldName ? { ...blip, sectorName: action.payload } : blip
                    ),
                ];
            }
            state.showEditSectorNameModal = false;
        },

        deleteSector: (state, action: PayloadAction<string>) => {
            state.blips = state.blips.filter((blip) => blip.sectorName !== action.payload);
            state.sectorNames = state.sectorNames.filter((name) => name !== action.payload);
            state.showDeleteSectorModal = false;
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
                const oldName = state.editingRingName;
                renameItemByName(state.ringNames, state.editingRingName, action.payload);
                state.blips = [
                    ...state.blips.map((blip) =>
                        blip.ringName === oldName ? { ...blip, ringName: action.payload } : blip
                    ),
                ];
            }
            state.showEditRingNameModal = false;
        },

        deleteRing: (state, action: PayloadAction<string>) => {
            state.ringNames = state.ringNames.filter((name) => name !== action.payload);
        },

        openDeleteRingModal: (state, action: PayloadAction<string>) => {
            state.editingRingName = action.payload;
            state.showDeleteRingModal = true;
        },

        closeDeleteRingModal: (state) => {
            state.showDeleteRingModal = false;
        },

        setShowEditIcon: (state, action: PayloadAction<boolean>) => {
            if (!state.isDragging) {
                state.eventSuggest = action.payload ? EventSuggest.EditText : null;
                state.showEditIcon = action.payload;
            }
        },

        openAddNewSectorModal: (state) => {
            state.showAddNewSectorModal = true;
        },

        openAddNewRingModal: (state) => {
            state.showAddNewRingModal = true;
        },

        closeAddNewSectorModal: (state) => {
            state.showAddNewSectorModal = false;
        },

        closeAddNewRingModal: (state) => {
            state.showAddNewSectorModal = false;
        },

        addNewSector: (state, action: PayloadAction<string>) => {
            state.sectorNames.push(action.payload);
            state.showAddNewSectorModal = false;
        },

        addNewRing: (state, action: PayloadAction<string>) => {
            state.ringNames.push(action.payload);
            state.showAddNewSectorModal = false;
        },

        setShowSaveRadarDialog: (state, action: PayloadAction<boolean>) => {
            state.showSaveRadarDialog = action.payload;
        },
        setRadarId: (state, action: PayloadAction<number>) => {
            state.radarId = action.payload;
        },
        setRadarName: (state, action: PayloadAction<string>) => {
            state.radarName = action.payload;
        },
        setRadarVersion: (state, action: PayloadAction<string>) => {
            state.radarVersion = action.payload;
        },

        setEditRadarParams: (state, action: PayloadAction<EditRadarInitialDataset>) => {
            state.radarId = action.payload.radarId;
            state.radarName = action.payload.radarName;
            state.radarVersion = action.payload.radarVersion;
            state.sectorNames = action.payload.radar.sectorNames;
            state.ringNames = action.payload.radar.ringNames;
            state.blips = action.payload.radar.blips;
        },

        setEditMode: (state, action: PayloadAction<EditMode>) => {
            state.mode = action.payload;
            if (action.payload === EditMode.NewVersionCreation) {
                state.radarId = null;
            }
        },

        setBlipEventId: (state, action: PayloadAction<number>) => {
            state.blipEventId = action.payload;
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
    openEditBlipModal,
    closeEditBlipModal,
    closeCreateBlipModal,
    openMoveBlipModal,
    closeMoveBlipModal,
    openDeleteBlipModal,
    closeDeleteBlipModal,
    openEditSectorNameModal,
    closeEditSectorNameModal,
    openDeleteSectorModal,
    closeDeleteSectorModal,
    addNewBlip,
    editBlip,
    moveBlip,
    deleteBlip,
    renameSector,
    deleteSector,
    openEditRingNameModal,
    closeEditRingNameModal,
    openDeleteRingModal,
    closeDeleteRingModal,
    renameRing,
    deleteRing,
    setShowEditIcon,
    openAddNewSectorModal,
    closeAddNewSectorModal,
    openAddNewRingModal,
    addNewSector,
    setShowSaveRadarDialog,
    setRadarId,
    setRadarName,
    setRadarVersion,
    setEditRadarParams,
    setEditMode,
} = editRadarSlice.actions;

export default editRadarSlice.reducer;
