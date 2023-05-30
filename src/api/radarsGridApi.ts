import { GridRowId } from '@mui/x-data-grid';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RadarsVersionData } from '../pages/admin/myRadars/myRadarsDataGrid/types';

const baseUrl = '/api';

export const radarsGridApi = createApi({
    reducerPath: 'radarsGridApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['VersionsList'],
    endpoints: (builder) => ({
        getRadarVersions: builder.query<RadarsVersionData, number>({
            query: (radarId) => ({
                url: `/radar-versions?radar-id=${radarId}`,
            }),
            providesTags: ['VersionsList'],
        }),
        deleteRadarVersions: builder.mutation<RadarsVersionData, GridRowId>({
            query: (versionId) => ({
                url: `/radar-versions/${versionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['VersionsList'],
        }),
    }),
});

export const { useGetRadarVersionsQuery, useDeleteRadarVersionsMutation } = radarsGridApi;
