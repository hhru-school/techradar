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
    version: VersionApiResponse;
    log: IndexBlipEventApi[] | null;
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
    showEditSectorModal: boolean;
    showDeleteSectorModal: boolean;
    showEditRingModal: boolean;
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
    showEditSectorModal: false,
    showDeleteSectorModal: false,
    showEditRingModal: false,
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

        openCreateBlipModal: (state) => {
            state.activeSegment = { sector: state.radar.sectors[0], ring: state.radar.rings[0] };
            state.showCreateBlipModal = true;
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

        openEditSectorModal: (state, action: PayloadAction<Sector>) => {
            state.showEditSectorModal = true;
            state.editingSector = action.payload;
        },

        closeEditSectorModal: (state) => {
            state.showEditSectorModal = false;
        },

        openDeleteSectorModal: (state) => {
            state.showDeleteSectorModal = true;
            state.showEditSectorModal = false;
        },

        closeDeleteSectorModal: (state) => {
            state.showDeleteSectorModal = false;
            state.showEditSectorModal = true;
        },

        renameSector: (state, action: PayloadAction<string>) => {
            state.radar.sectors.forEach((sector) => {
                if (sector.id === state.editingSector?.id) {
                    sector.name = action.payload;
                }
            });
            state.showEditSectorModal = false;
        },

        renameRing: (state, action: PayloadAction<string>) => {
            state.radar.rings.forEach((ring) => {
                if (ring.id === state.editingRing?.id) {
                    ring.name = action.payload;
                }
            });
            state.showEditRingModal = false;
        },

        deleteSector: (state) => {
            if (!state.editingSector) throw new Error('Cannot delete cause has not editing sector');
            state.radar.sectors = [...state.radar.sectors.filter((sector) => sector.id !== state.editingSector?.id)];
            state.showDeleteSectorModal = false;
            state.showEditSectorModal = false;
        },

        openEditRingModal: (state, action: PayloadAction<Ring>) => {
            state.showEditRingModal = true;
            state.editingRing = action.payload;
        },

        closeEditRingModal: (state) => {
            state.showEditRingModal = false;
        },

        deleteRing: (state) => {
            if (!state.editingRing) throw new Error('Cannot delete cause has not editing ring');
            state.radar.rings = [...state.radar.rings.filter((ring) => ring.id !== state.editingRing?.id)];
            state.showDeleteRingModal = false;
            state.showEditRingModal = false;
        },

        openDeleteRingModal: (state) => {
            state.showDeleteRingModal = true;
            state.showEditRingModal = false;
        },

        closeDeleteRingModal: (state) => {
            state.showDeleteRingModal = false;
            state.showEditRingModal = true;
        },

        openEditRadarNameModal: (state) => {
            state.showEditRadarNameModal = true;
        },

        closeEditRadarNameModal: (state) => {
            state.showEditRadarNameModal = false;
        },

        setRadarName: (state, action: PayloadAction<string>) => {
            state.radar.name = action.payload;
            state.showEditRadarNameModal = false;
        },

        setVersionName: (state, action: PayloadAction<string>) => {
            state.version.name = action.payload;
            state.showEditVersionNameModal = false;
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
            state.showAddNewRingModal = false;
        },

        addNewSector: (state, action: PayloadAction<string>) => {
            state.radar.sectors.push({ id: state.radar.sectors.length, name: action.payload });
            state.showAddNewSectorModal = false;
        },

        addNewRing: (state, action: PayloadAction<string>) => {
            state.radar.rings.push({ id: state.radar.rings.length, name: action.payload });
            state.showAddNewRingModal = false;
        },

        setShowSaveRadarDialog: (state, action: PayloadAction<boolean>) => {
            state.showSaveRadarDialog = action.payload;
        },

        setEditMode: (state, action: PayloadAction<ConstructorMode>) => {
            state.mode = action.payload;
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

        cleanUp: () => {
            return initialState;
        },

        setShowSwitchReleaseModal: (state, action: PayloadAction<boolean>) => {
            state.showSwitchReleaseModal = action.payload;
        },

        setRadarLog: (state, action: PayloadAction<IndexBlipEventApi[]>) => {
            state.log = action.payload;
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
    openCreateBlipModal,
    closeCreateBlipModal,
    openMoveBlipModal,
    closeMoveBlipModal,
    openDeleteBlipModal,
    closeDeleteBlipModal,
    openEditSectorModal,
    closeEditSectorModal,
    openDeleteSectorModal,
    closeDeleteSectorModal,
    addNewBlip,
    editBlip,
    moveBlip,
    deleteBlip,
    renameSector,
    deleteSector,
    openEditRingModal,
    closeEditRingModal,
    openDeleteRingModal,
    closeDeleteRingModal,
    renameRing,
    deleteRing,
    setShowEditIcon,
    openAddNewSectorModal,
    closeAddNewSectorModal,
    openAddNewRingModal,
    closeAddNewRingModal,
    addNewSector,
    addNewRing,
    setShowSaveRadarDialog,
    setEditMode,
    setIsLoading,
    setHasError,
    setRadar,
    setVersion,
    setRadarLog,
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
