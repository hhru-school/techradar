import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { VersionApiResponse } from '../api/types';
import { RadarInterface } from '../components/radar/types';

interface RadarDisplayAsset {
    radar?: RadarInterface;
    version?: VersionApiResponse;
    versions?: VersionApiResponse[];
}

interface CompanyRadarItem {
    id: number;
    name: string;
}

interface DisplayRadarState {
    radar: RadarInterface | null;
    companyRadars: CompanyRadarItem[] | null;
    companyId: number;
    version: VersionApiResponse | null;
    versions: VersionApiResponse[] | null;
    activeSectorId: number | null;
    hoveredSectorId: number | null;
    isTransforming: boolean;
}

const initialState: DisplayRadarState = {
    radar: null,
    companyRadars: null,
    companyId: -1,
    version: null,
    versions: null,
    activeSectorId: null,
    hoveredSectorId: null,
    isTransforming: false,
};

export const displayRadarSlice = createSlice({
    name: 'activeSector',
    initialState,
    reducers: {
        setActiveSector: (state, action: PayloadAction<number>) => {
            state.hoveredSectorId = null;
            state.isTransforming = state.activeSectorId !== action.payload;
            state.activeSectorId = action.payload;
        },

        setHoveredSector: (state, action: PayloadAction<number>) => {
            state.hoveredSectorId = action.payload;
        },
        clearHoveredSector: (state) => {
            state.hoveredSectorId = null;
        },

        setIsTransforming: (state, action: PayloadAction<boolean>) => {
            state.isTransforming = action.payload;
        },

        clearActiveSector: (state) => {
            state.activeSectorId = null;
            state.hoveredSectorId = null;
            state.isTransforming = false;
        },

        setRadarDisplayAsset: (state, action: PayloadAction<RadarDisplayAsset>) => {
            state.radar = action.payload.radar || null;
            state.version = action.payload.version || null;
            state.versions = action.payload.versions || null;
        },

        clearRadarDisplayAsset: (state) => {
            state.radar = null;
            state.version = null;
            state.versions = null;
        },

        setCompanyRadars: (state, action: PayloadAction<CompanyRadarItem[] | null>) => {
            state.companyRadars = action.payload;
        },

        setCompanyId: (state, action: PayloadAction<number>) => {
            state.companyId = action.payload;
        },

        clearPageAsset: (state) => {
            state.radar = null;
            state.version = null;
            state.versions = null;
            state.companyRadars = null;
        },
    },
});

export const {
    setActiveSector,
    setHoveredSector,
    setCompanyId,
    clearHoveredSector,
    clearActiveSector,
    setIsTransforming,
    setRadarDisplayAsset,
    clearRadarDisplayAsset,
    setCompanyRadars,
    clearPageAsset,
} = displayRadarSlice.actions;

export default displayRadarSlice.reducer;
