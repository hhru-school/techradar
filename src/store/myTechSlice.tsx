import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RowTech, GridTech } from '../pages/admin/myTechnologies/myTechDataGrid/MyTechDataGrid';
import { initialState } from './mock';

export const MyTechSlice = createSlice({
    name: 'myTech',
    initialState,
    reducers: {
        setTechCreateModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showTechCreateModal = action.payload;
        },
        createNewTech: (state, action: PayloadAction<RowTech>) => {
            state.techGrid = [...state.techGrid, action.payload];
        },
        updateTechGrid: (state, action: PayloadAction<GridTech>) => {
            state.techGrid = action.payload;
        },
    },
});

export const { setTechCreateModalOpen, createNewTech, updateTechGrid } = MyTechSlice.actions;

export default MyTechSlice.reducer;
