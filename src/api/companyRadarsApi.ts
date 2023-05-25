import { GridRowId } from '@mui/x-data-grid';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiRadarData, FormattedRadarData, formatApiData } from './radarApiUtils';

const baseUrl = '/api';

export interface RadarApi {
    id: number;
    name: string;
}

export type RadarVersionData = Array<{
    id: number;
    name: string;
    release: boolean;
    radarId: number;
    blipEventId: number;
    creationTime: string;
    lastChangeTime: string;
}>;

export const companyRadarsApi = createApi({
    reducerPath: 'companyRadarsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['VersionsList'],
    endpoints: (builder) => ({
        getAllCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => `/radars?company-id=${companyId}`,
        }),
        getRadar: builder.query<FormattedRadarData, number>({
            query: (radarId) => `/radars/${radarId}`,
            transformResponse: (rawResult: ApiRadarData) => formatApiData(rawResult),
        }),
        getRadarVersions: builder.query<RadarVersionData, number>({
            query: (radarId) => ({
                url: `/radar-versions?radar-id=${radarId}`,
            }),
            providesTags: ['VersionsList'],
        }),
        deleteRadarVersions: builder.mutation<RadarVersionData, GridRowId>({
            query: (versionId) => ({
                url: `/radar-versions/${versionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['VersionsList'],
        }),
    }),
});

export const {
    useGetAllCompanyRadarsQuery,
    useGetRadarQuery,
    useGetRadarVersionsQuery,
    useDeleteRadarVersionsMutation,
} = companyRadarsApi;
