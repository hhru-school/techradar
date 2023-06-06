import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IndexBlipEventApi, VersionApiResponse } from '../api/types';
import { Blip, RadarInterface, Ring, Sector } from '../components/radar/types';
import { defaultRadarAsset, defaultVersionAsset } from '../pages/constructor/config';

export interface Segment {
    sector: Sector;
    ring: Ring;
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
    sector: Sector;
    ring: Ring;
}

export enum EventSuggest {
    Delete = 'delete',
    Add = 'add',
    Move = 'move',
    NotAllowed = 'notAllowed',
    EditText = 'editText',
}

export enum ConstructorMode {
    NewRadarCreation,
    NewVersionCreation,
    VersionEditing,
}

export interface EditRadarState {
    radar: RadarInterface;
    isModalLoading: boolean;
    isPageLoading: boolean;
    hasError: boolean;
    // version: VersionApiResponse | null;
    version: VersionApiResponse;
    blipEvent: IndexBlipEventApi | null;
    log: IndexBlipEventApi[] | null;
    // currentVersionName: string;
    currentBlipEventId: number | null;
    mode: ConstructorMode;
    isDragging: boolean;
    editingBlip: Blip | null;
    blipAsset: EditingBlipAsset | null;
    activeSegment: Segment | null;
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
    showEditRadarNameModal: boolean;
    showEditVersionNameModal: boolean;
    showAddNewSectorModal: boolean;
    showAddNewRingModal: boolean;
    showSaveRadarDialog: boolean;
    showSwitchReleaseModal: boolean;
    showDeleteBlipEventModal: boolean;
    editingSector: Sector | null;
    editingRing: Ring | null;
    showEditIcon: boolean;
    editingBlipEventId: number;
}

const initialState: EditRadarState = {
    isModalLoading: false,
    isPageLoading: false,
    radar: defaultRadarAsset,
    log: null,
    hasError: false,
    version: defaultVersionAsset,
    blipEvent: null,
    currentBlipEventId: null,
    mode: ConstructorMode.NewRadarCreation,
    isDragging: false,
    editingBlip: null,
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
    showEditRadarNameModal: false,
    showEditVersionNameModal: false,
    showDeleteBlipEventModal: false,
    editingSector: null,
    editingRing: null,
    showAddNewSectorModal: false,
    showAddNewRingModal: false,
    showSaveRadarDialog: false,
    showSwitchReleaseModal: false,
    showEditIcon: false,
    editingBlipEventId: -1,
};

const getBlipById = (state: EditRadarState, id: number): Blip | null => {
    return state.radar.blips.find((blip) => blip.id === id) || null;
};

const removeBlipById = (state: EditRadarState, id: number) => {
    state.radar.blips = state.radar.blips.filter((blip) => blip.id !== id);
};

const moveBlipTosegment = (state: EditRadarState, blip: Blip, segment: Segment | null) => {
    if (!segment) return;
    removeBlipById(state, blip.id);
    state.radar.blips.push({ ...blip, ring: segment.ring, sector: segment.sector });
};

const repalceBlip = (state: EditRadarState, blip: Blip) => {
    removeBlipById(state, blip.id);
    state.radar.blips.push(blip);
};

export const editRadarSlice = createSlice({
    name: 'editRadar',
    initialState,
    reducers: {
        setIsPageLoading: (state, action: PayloadAction<boolean>) => {
            state.isPageLoading = action.payload;
        },

        setIsModalLoading: (state, action: PayloadAction<boolean>) => {
            state.isModalLoading = action.payload;
        },
        setIsDragging: (state, action: PayloadAction<boolean>) => {
            state.isDragging = action.payload;
        },

        setActiveSegment: (state, action: PayloadAction<Segment>) => {
            state.activeSegment = action.payload;
            if (state.isCreating) {
                state.eventSuggest = EventSuggest.Add;
            } else if (state.editingBlip) {
                if (
                    state.editingBlip.ring.id !== state.activeSegment.ring.id ||
                    state.editingBlip.sector.id !== state.activeSegment.sector.id
                ) {
                    state.eventSuggest = EventSuggest.Move;
                } else {
                    state.eventSuggest = null;
                }
            }
        },

        clearActiveSegment: (state) => {
            state.activeSegment = null;
            if (state.editingBlip) {
                state.eventSuggest = EventSuggest.Delete;
            }
            if (state.isCreating) {
                state.eventSuggest = EventSuggest.NotAllowed;
            }
        },

        setDraggingBlip: (state, action: PayloadAction<EditingBlipAsset>) => {
            state.blipAsset = action.payload;
            state.editingBlip = getBlipById(state, action.payload.id);
            state.isDragging = true;
        },

        setIsCreating: (state) => {
            state.isCreating = true;
            if (!state.activeSegment) {
                state.eventSuggest = EventSuggest.NotAllowed;
            }
        },

        drop: (state) => {
            if (state.editingBlip) {
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
            state.editingBlip = getBlipById(state, action.payload);
            state.showEditBlipModal = true;
        },

        closeEditBlipModal: (state) => {
            state.showEditBlipModal = false;
        },

        closeCreateBlipModal: (state) => {
            state.showCreateBlipModal = false;
        },

        openMoveBlipModal: (state, action: PayloadAction<MoveBlipAsset>) => {
            state.editingBlip = getBlipById(state, action.payload.id);
            state.activeSegment = { sector: action.payload.sector, ring: action.payload.ring };
            state.showMoveBlipModal = true;
        },

        closeMoveBlipModal: (state) => {
            state.showMoveBlipModal = false;
        },

        openDeleteBlipModal: (state, action: PayloadAction<number>) => {
            state.editingBlip = getBlipById(state, action.payload);
            state.showDeleteBlipModal = true;
        },

        closeDeleteBlipModal: (state) => {
            state.showDeleteBlipModal = false;
        },

        addNewBlip: (state, action: PayloadAction<Blip>) => {
            const maxId =
                state.radar.blips.length > 0 ? Math.max(...state.radar.blips.map((blip) => Number(blip.label))) : 0;
            state.radar.blips.push({ ...action.payload, id: maxId, label: maxId + 1 });
            state.showCreateBlipModal = false;
            state.activeSegment = null;
        },

        editBlip: (state, action: PayloadAction<Blip>) => {
            repalceBlip(state, action.payload);
            state.showEditBlipModal = false;
        },

        moveBlip: (state) => {
            if (state.editingBlip) {
                moveBlipTosegment(state, state.editingBlip, state.activeSegment);
            }
            state.editingBlip = null;
            state.showMoveBlipModal = false;
            state.activeSegment = null;
        },

        deleteBlip: (state) => {
            if (state.editingBlip) {
                removeBlipById(state, state.editingBlip.id);
            }
            state.showDeleteBlipModal = false;
        },

        openEditSectorNameModal: (state, action: PayloadAction<Sector>) => {
            state.showEditSectorNameModal = true;
            state.editingSector = action.payload;
        },

        closeEditSectorNameModal: (state) => {
            state.showEditSectorNameModal = false;
        },

        openDeleteSectorModal: (state, action: PayloadAction<Sector>) => {
            state.editingSector = action.payload;
            state.showDeleteSectorModal = true;
        },

        closeDeleteSectorModal: (state) => {
            state.showDeleteSectorModal = false;
        },

        renameSector: (state, action: PayloadAction<string>) => {
            state.radar.sectors.forEach((sector) => {
                if (sector.id === state.editingSector?.id) {
                    sector.name = action.payload;
                }
            });
        },

        renameRing: (state, action: PayloadAction<string>) => {
            state.radar.rings.forEach((ring) => {
                if (ring.id === state.editingRing?.id) {
                    ring.name = action.payload;
                }
            });
        },

        deleteSector: (state, action: PayloadAction<Sector>) => {
            state.radar.sectors = [...state.radar.sectors.filter((sector) => sector.id !== action.payload.id)];
        },

        openEditRingNameModal: (state, action: PayloadAction<Ring>) => {
            state.showEditRingNameModal = true;
            state.editingRing = action.payload;
        },

        closeEditRingNameModal: (state) => {
            state.showEditRingNameModal = false;
        },

        deleteRing: (state, action: PayloadAction<Ring>) => {
            state.radar.rings = state.radar.rings.filter((ring) => ring.id !== action.payload.id);
        },

        openDeleteRingModal: (state, action: PayloadAction<Ring>) => {
            state.editingRing = action.payload;
            state.showDeleteRingModal = true;
        },

        closeDeleteRingModal: (state) => {
            state.showDeleteRingModal = false;
        },

        openEditRadarNameModal: (state) => {
            state.showEditRadarNameModal = true;
        },

        closeEditRadarNameModal: (state) => {
            state.showEditRadarNameModal = false;
        },

        setRadarName: (state, action: PayloadAction<string>) => {
            state.radar.name = action.payload;
        },

        setVersionName: (state, action: PayloadAction<string>) => {
            state.version.name = action.payload;
        },

        openEditVersionNameModal: (state) => {
            state.showEditVersionNameModal = true;
        },

        closeEditVersionNameModal: (state) => {
            state.showEditVersionNameModal = false;
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
            // Рефакторить при подключении API
            state.radar.sectors.push({ id: state.radar.sectors.length, name: action.payload });
            state.showAddNewSectorModal = false;
        },

        addNewRing: (state, action: PayloadAction<string>) => {
            // Рефакторить при подключении API
            state.radar.rings.push({ id: state.radar.rings.length, name: action.payload });
            state.showAddNewSectorModal = false;
        },

        setShowSaveRadarDialog: (state, action: PayloadAction<boolean>) => {
            state.showSaveRadarDialog = action.payload;
        },

        setEditMode: (state, action: PayloadAction<ConstructorMode>) => {
            state.mode = action.payload;
        },

        setBlipEventId: (state, action: PayloadAction<number>) => {
            state.currentBlipEventId = action.payload;
        },

        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isModalLoading = action.payload;
        },

        setHasError: (state, action: PayloadAction<boolean>) => {
            state.hasError = action.payload;
        },

        setRadar: (state, action: PayloadAction<RadarInterface>) => {
            state.radar = action.payload;
        },

        setVersion: (state, action: PayloadAction<VersionApiResponse>) => {
            state.version = action.payload;
        },

        isetCurrentBlipEventId: (state, action: PayloadAction<number>) => {
            state.currentBlipEventId = action.payload;
        },

        setCurrenBlipEventId: (state, action: PayloadAction<number>) => {
            state.currentBlipEventId = action.payload;
        },

        cleanUp: (state) => {
            state.isModalLoading = false;
            state.hasError = false;
        },

        setShowSwitchReleaseModal: (state, action: PayloadAction<boolean>) => {
            state.showSwitchReleaseModal = action.payload;
        },

        setRadarLog: (state, action: PayloadAction<IndexBlipEventApi[]>) => {
            state.log = action.payload;
        },

        setBlipEvent: (state, action: PayloadAction<IndexBlipEventApi>) => {
            state.blipEvent = action.payload;
        },

        openDeleteBlipEventModal: (state, action: PayloadAction<number>) => {
            state.showDeleteBlipEventModal = true;
            state.editingBlipEventId = action.payload;
        },

        closeDeleteBlipEventModal: (state) => {
            state.showDeleteBlipEventModal = false;
        },
    },
});

export const {
    setIsModalLoading,
    setIsPageLoading,
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
    setEditMode,
    setIsLoading,
    setHasError,
    setRadar,
    setVersion,
    setRadarLog,
    setBlipEvent,
    cleanUp,
    setShowSwitchReleaseModal,
    openEditRadarNameModal,
    closeEditRadarNameModal,
    setRadarName,
    setVersionName,
    openEditVersionNameModal,
    closeEditVersionNameModal,
    openDeleteBlipEventModal,
    closeDeleteBlipEventModal,
} = editRadarSlice.actions;

export default editRadarSlice.reducer;
