import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RowTech, GridTech } from '../pages/admin/MyTechnologies/MyTechDataGrid/MyTechDataGrid';
import {
    GridRadarConstructor,
    RowRadarConstructor,
} from '../pages/admin/RadarConstructor/RadarConstructorGrid/RadarConstructorGrid';
import { initialState, AuthFormInputs } from './mock';

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setAuthFormOpen: (state, action: PayloadAction<boolean>) => {
            state.showAuthentificationForm = action.payload;
        },
        setAuthFormData: (state, action: PayloadAction<AuthFormInputs>) => {
            state.authentificationFormData = action.payload;
        },
        setRadarsCreateModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showRadarsCreateModal = action.payload;
        },
        setTechCreateModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showTechCreateModal = action.payload;
        },
        setRadarConstrTechModalOpen: (state, action: PayloadAction<boolean>) => {
            state.showRadarConstrTechModal = action.payload;
        },
        createNewRadarSection: (state, action: PayloadAction<string>) => {
            state.radarGrid = {
                ...state.radarGrid,
                [action.payload]: [],
            };
        },
        createNewTech: (state, action: PayloadAction<RowTech>) => {
            state.techGrid = [...state.techGrid, action.payload];
        },
        updateTechGrid: (state, action: PayloadAction<GridTech>) => {
            state.techGrid = action.payload;
        },
        updateRadarConstrGrid: (state, action: PayloadAction<GridRadarConstructor>) => {
            state.radarConstructorGrid = action.payload;
        },
        updateCercleCount: (state, action: PayloadAction<number>) => {
            state.countCercleInputs = action.payload;
        },
        updateSectorCount: (state, action: PayloadAction<number>) => {
            state.countSectorInputs = action.payload;
        },
        updateRadarConstrTechGrid: (state, action: PayloadAction<RowRadarConstructor>) => {
            state.radarConstructorGrid = [...state.radarConstructorGrid, action.payload];
        },
    },
});

export const {
    setAuthFormOpen,
    setAuthFormData,
    setRadarsCreateModalOpen,
    createNewRadarSection,
    setTechCreateModalOpen,
    createNewTech,
    updateTechGrid,
    updateRadarConstrGrid,
    updateCercleCount,
    updateSectorCount,
    setRadarConstrTechModalOpen,
    updateRadarConstrTechGrid,
} = dataSlice.actions;

export default dataSlice.reducer;
