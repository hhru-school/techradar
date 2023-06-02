import { GridRowId } from '@mui/x-data-grid';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RadarVersionData } from '../pages/admin/myRadars/myRadarsDataGrid/types';

const baseUrl = '/api';

export const radarsGridApi = createApi({
    reducerPath: 'radarsGridApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['VersionsList'],
    endpoints: (builder) => ({
        getRadarVersions: builder.query<RadarVersionData, number>({
            query: (radarId) => ({
                url: `/radar-versions?radar-id=${radarId}`,
            }),
            providesTags: ['VersionsList'],
        }),
        deleteRadarVersion: builder.mutation<RadarVersionData, GridRowId>({
            query: (versionId) => ({
                url: `/radar-versions/${versionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['VersionsList'],
        }),
    }),
});

export const { useGetRadarVersionsQuery, useDeleteRadarVersionMutation } = radarsGridApi;
