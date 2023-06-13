import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { VersionData } from '../api/types';
import { initialState } from './mock';

type CreateVersionPayload = { show: boolean; radarId: number | null };
type GridDeleteVersion = { show: boolean; data: VersionData | null };
export const myRadarsSlice = createSlice({
    name: 'myRadars',
    initialState,
    reducers: {
        setCreateVersionModalOpen: (state, action: PayloadAction<CreateVersionPayload>) => {
            state.showCreateVersionModal = action.payload.show;
            state.createVersionId = action.payload.radarId;
        },
        setCreateRadarModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showCreateRadarModal = action.payload;
        },
        setFilteredListVersions: (state, action: PayloadAction<boolean>) => {
            state.isfilteredVersionsList = action.payload;
        },
        setConfirmDeleteVesionModal: (state, action: PayloadAction<GridDeleteVersion>) => {
            state.showConfirmDeleteVesionModal = action.payload.show;
            state.deleteGridVersionData = action.payload.data;
        },
    },
});

export const {
    setCreateVersionModalOpen,
    setFilteredListVersions,
    setCreateRadarModalOpen,
    setConfirmDeleteVesionModal,
} = myRadarsSlice.actions;

export default myRadarsSlice.reducer;
