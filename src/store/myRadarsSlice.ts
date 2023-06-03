import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './mock';

type CreateVersionPayload = { show: boolean; radarId: number | null };

export const myRadarsSlice = createSlice({
    name: 'myRadars',
    initialState,
    reducers: {
        setCreateVersionModalOpen: (state, action: PayloadAction<CreateVersionPayload>) => {
            state.showCreateVersionModal = action.payload.show;
            state.createVersionId = action.payload.radarId;
        },
    },
});

export const { setCreateVersionModalOpen } = myRadarsSlice.actions;

export default myRadarsSlice.reducer;
