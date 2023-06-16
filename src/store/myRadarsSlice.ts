import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CreateVersionPayload = { show: boolean; radarId: number | null };

interface State {
    showCreateVersionModal: boolean;
    createVersionId: number | null;
    isfilteredVersionsList: boolean;
    showCreateRadarModal: boolean;
}

export const initialState: State = {
    showCreateVersionModal: false,
    createVersionId: null,
    isfilteredVersionsList: true,
    showCreateRadarModal: false,
};

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
    },
});

export const { setCreateVersionModalOpen, setFilteredListVersions, setCreateRadarModalOpen } = myRadarsSlice.actions;

export default myRadarsSlice.reducer;
