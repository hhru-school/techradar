import { GridRowId } from '@mui/x-data-grid';

import { RadarVersionData } from '../pages/admin/myRadars/myRadarsDataGrid/types';
import { apiSlice } from './authApi';
import { NewVersionRequest, NewVersionResponse } from './types';

export const radarsGridApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRadarVersions: builder.query<NewVersionResponse[], number>({
            query: (radarId) => ({
                url: `/radar-versions?radar-id=${radarId}`,
            }),
            providesTags: ['VersionsList', 'CreateVersion', 'Version'],
        }),
        deleteRadarVersion: builder.mutation<RadarVersionData, GridRowId>({
            query: (versionId) => ({
                url: `/radar-versions/${versionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['VersionsList'],
        }),
        createNewVersion: builder.mutation<NewVersionResponse, NewVersionRequest>({
            query: (body) => ({
                url: `/radar-versions?link-to-last-release=true`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['CreateVersion'],
        }),
    }),
});

export const { useGetRadarVersionsQuery, useDeleteRadarVersionMutation, useCreateNewVersionMutation } = radarsGridApi;
