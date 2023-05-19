import { GridRowId } from '@mui/x-data-grid';

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './authApi';
import { ApiRadarData, FormattedRadarData, formatApiData } from './radarApiUtils';

// const baseUrl = '/api';
import { RootState } from '../store/store';
import {
    ApiRadarData,
    CreateRadarApiData,
    RadarApiDataResponse,
    CreateRadarVersionDataApi,
    CreateRadarVersionDataApiResponse,
    FormattedRadarData,
    formatApiData,
} from './radarApiUtils';

const baseUrl = '/api/';

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

// export const companyRadarsApi = createApi({
//     reducerPath: 'companyRadarsApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
// 	tagTypes: ['VersionsList'],
//     endpoints: (builder) => ({
//         getAllCompanyRadars: builder.query<RadarApi[], number>({
//             query: (companyId) => `/radars?company-id=${companyId}`,
//         }),
//         getRadar: builder.query<FormattedRadarData, number>({
//             query: (radarId) => `/radars/${radarId}`,
//             transformResponse: (rawResult: ApiRadarData) => formatApiData(rawResult),
//         }),
//         getRadarVersions: builder.query<RadarVersionData, number>({
//             query: (radarId) => ({
//                 url: `/radar-versions?radar-id=${radarId}`,
//             }),
//             providesTags: ['VersionsList'],
//         }),
//         deleteRadarVersions: builder.mutation<RadarVersionData, GridRowId>({
//             query: (versionId) => ({
//                 url: `/radar-versions/${versionId}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['VersionsList'],
//         }),
//     }),
// });

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => `/radars?company-id=${companyId}`,
        }),
        // getRadar: builder.query<FormattedRadarData, number>({
        //     query: (radarId) => `/${radarId}`,
        //     transformResponse: (rawResult: ApiRadarData) => formatApiData(rawResult),
        // }),

        getRadar: builder.query<FormattedRadarData, number>({
            query: (radarId) => `/radars/${radarId}`,
            transformResponse: (rawResult: ApiRadarData) => formatApiData(rawResult),
        }),

        // getRadar: builder.query<FormattedRadarData, number>({
        //     query: (radarId) => `/${radarId}`,
        //      transformResponse: (rawResult: ApiRadarData) => formatApiData(rawResult),
        //  }),

        // getRadar: builder.query<FormattedRadarData, RadarQueryParams>({
        //     async queryFn(arg, _api, _options, fetchBaseQuery) {
        //         if (arg.blipEventId) {
        //             const radar = await fetchBaseQuery(`/containers?blipEventId=${arg.blipEventId}`);
        //             if (radar.error) return { error: radar.error as FetchBaseQueryError };
        //             return radar.data as FormattedRadarData;
        //         }

        //         const radarVersions = await fetchBaseQuery({
        //             url: `/${arg.radarId}`,
        //             method: 'GET',
        //         });
        //         if (radarVersions.error) return { error: radarVersions.error };

        //     },
        // }),

        getAllRadarVersions: builder.query<CreateRadarVersionDataApiResponse[], number>({
            query: (radarId) => `radar_versions?radarId=${radarId}`,
        }),

        saveNewRadar: builder.mutation<CreateRadarVersionDataApiResponse, CreateRadarApiData>({
            async queryFn(radarData, { getState }, _options, fetchBaseQuery) {
                const radarResponse = await fetchBaseQuery({
                    url: 'containers',
                    method: 'POST',
                    body: radarData,
                });
                if (radarResponse.error) return { error: radarResponse.error };
                const radar = radarResponse.data as RadarApiDataResponse;
                const versionRequestBody: CreateRadarVersionDataApi = {
                    name: (getState() as RootState).editRadar.radarVersion,
                    release: false,
                    radarId: radar.radarId,
                    blipEventId: radar.blipEventId,
                };
                const result = await fetchBaseQuery({
                    url: 'radar_versions',
                    method: 'POST',
                    body: versionRequestBody,
                });

                if (result.error) return { error: result.error };

                return { data: result.data as CreateRadarVersionDataApiResponse };
            },
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

// export const {
//     useGetAllCompanyRadarsQuery,
//     useGetRadarQuery,
//     useGetRadarVersionsQuery,
//     useDeleteRadarVersionsMutation,
// } = companyRadarsApi;

export const {
    useGetAllCompanyRadarsQuery,
    useGetRadarQuery,
    useGetRadarVersionsQuery,
    useDeleteRadarVersionsMutation,
} = authApiSlice;
