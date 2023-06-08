import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { VersionApiResponse } from '../api/types';
import { RadarInterface } from '../components/radar/types';

interface VersionAsset {
    versions: VersionApiResponse[] | null;
    currentVersionId: number;
}

export interface VersionSettingData {
    versions: VersionApiResponse[];
    displayLatest?: boolean;
    displayVersionId?: number;
}

interface CompanyRadarItem {
    id: number;
    name: string;
}

interface DisplayRadarState {
    radar: RadarInterface | null;
    companyRadars: CompanyRadarItem[] | null;
    companyId: number;
    versionAsset: VersionAsset;
    activeSectorId: number | null;
    hoveredSectorId: number | null;
    isTransforming: boolean;
}

const initialVersionAsset = {
    versions: null,
    currentVersionId: -1,
};

const initialState: DisplayRadarState = {
    radar: null,
    companyRadars: null,
    companyId: -1,
    versionAsset: initialVersionAsset,
    activeSectorId: null,
    hoveredSectorId: null,
    isTransforming: false,
};

const getLastVersion = (versions: VersionApiResponse[]): VersionApiResponse => {
    const sorted = [...versions].sort((version1, version2) =>
        version2.creationTime.localeCompare(version1.creationTime)
    );
    return sorted[0];
};

const getVersionById = (versions: VersionApiResponse[], id: number): VersionApiResponse => {
    const res = versions.find((version) => version.id === id);
    if (!res) throw new Error('Version not exist');
    else return res;
};

export const displayRadarSlice = createSlice({
    name: 'displayRadar',
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

        setCompanyRadars: (state, action: PayloadAction<CompanyRadarItem[] | null>) => {
            state.companyRadars = action.payload;
        },

        setCompanyId: (state, action: PayloadAction<number>) => {
            state.companyId = action.payload;
        },

        setVersionAsset: (state, action: PayloadAction<VersionSettingData>) => {
            const data = action.payload;
            if (data.versions.length === 0) throw new Error('Empty versions list');
            state.versionAsset.versions = data.versions;
            if (data.displayLatest) {
                state.versionAsset.currentVersionId = getLastVersion(data.versions).id;
            } else if (data.displayVersionId) {
                state.versionAsset.currentVersionId = getVersionById(data.versions, data.displayVersionId).id;
            }
        },

        setRadar: (state, action: PayloadAction<RadarInterface>) => {
            state.radar = action.payload;
        },

        cleanUpRadar: (state) => {
            state.versionAsset = initialVersionAsset;
            state.radar = null;
            state.activeSectorId = null;
            state.hoveredSectorId = null;
        },

        cleanUpPage: () => {
            return initialState;
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
    setCompanyRadars,
    setRadar,
    setVersionAsset,
    cleanUpRadar,
    cleanUpPage,
} = displayRadarSlice.actions;

export default displayRadarSlice.reducer;
