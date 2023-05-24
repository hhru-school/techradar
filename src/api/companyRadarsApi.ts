import { GridRowId } from '@mui/x-data-grid';

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './authApi';
import { ApiRadarData, FormattedRadarData, formatApiData } from './radarApiUtils';

// const baseUrl = '/api';
import { Blip } from '../components/radar/types';
import { EditRadarState } from '../store/editRadarSlice';
import { RootState } from '../store/store';
import {
    CreateRadarApiData,
    RadarApiDataResponse,
    BasicRadarData,
    formatApiData,
    RadarData,
    CreateRadarVersionDataApi,
    VersionApiResponse,
    CreateBlipEventApiResponse,
    CreateBlipEventApiRequest,
    CreateBlipApiRequest,
    CreateBlipApiResponse,
} from './radarApiUtils';

const baseUrl = '/api/';

const getQuadrantId = (state: EditRadarState, sectorName: string): number => {
    if (!state.sectors) return -1;
    return state.sectors.find((sector) => sector.name === sectorName)?.id || -1;
};

const getRingId = (state: EditRadarState, ringName: string): number => {
    if (!state.rings) return -1;
    return state.rings.find((ring) => ring.name === ringName)?.id || -1;
};

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
// http://localhost:3000/techradar/company/1/radar/23424323/version/23434

// создание радара за один раз: /api/containers
// Создать новую версию для радара POST на /api/radar_versions
// Получить все версии радара: GET на api/radar_versions?radarId=1
// Получение радара определенной версии (по blipEventId): GET на api/containers?blipEventId=77
// Получить лог радара: GET на api/blip_events/radar_log?blipEventId=78
// Получение радара определенной версии (по radarVersionId): GET на api/containers?radarVersionId=3

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => `/radars?company-id=${companyId}`,
        }),

        getRadar: builder.query<FormattedRadarData, number>({
            query: (radarId) => `/radars/${radarId}`,
            transformResponse: (rawResult: ApiRadarData) => formatApiData(rawResult),
        }),

        getAllRadarVersions: builder.query<CreateRadarVersionDataApiResponse[], number>({
            query: (radarId) => `radar_versions?radarId=${radarId}`,
        }),
        getRadarByVersionId: builder.query<RadarData, number>({
            query: (radarVersionId) => `containers?radar-version-id=${radarVersionId}`,
            transformResponse: (rawResult: RadarApiDataResponse) => formatApiData(rawResult),
        }),

        getAllRadarVersions: builder.query<VersionApiResponse[], number>({
            query: (radarId) => `radar-versions/?radar-id=${radarId}`,
        }),

        saveNewRadar: builder.mutation<VersionApiResponse, CreateRadarApiData>({
            async queryFn(radarData, { getState }, _options, fetchBaseQuery) {
                const radarResponse = await fetchBaseQuery({
                    url: 'containers',
                    method: 'POST',
                    body: radarData,
                });

                if (radarResponse.error) return { error: radarResponse.error };
                const newRadar = radarResponse.data as RadarApiDataResponse;

                const state = getState() as RootState;

                const versionRequestBody: CreateRadarVersionDataApi = {
                    name: state.editRadar.currentVersionName,
                    release: false,
                    radarId: newRadar.radar.id,
                    blipEventId: Number(newRadar.blipEventId),
                };

                const result = await fetchBaseQuery({
                    url: 'radar-versions',
                    method: 'POST',
                    body: versionRequestBody,
                });

                if (result.error) return { error: result.error };

                return { data: result.data as VersionApiResponse };
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

        addNewBlipToRadar: builder.mutation<CreateBlipEventApiResponse, Blip>({
            async queryFn(blip, { getState }, __, fetchBaseQuery) {
                const state = (getState() as RootState).editRadar;

                const blipRequest: CreateBlipApiRequest = {
                    name: blip.name,
                    description: blip.description || '',
                    radarId: Number(state.radarId),
                };

                const blipResponse = await fetchBaseQuery({
                    url: 'blips',
                    method: 'POST',
                    body: blipRequest,
                });

                if (blipResponse.error) return { error: blipResponse.error };

                const newBlipApi = blipResponse.data as CreateBlipApiResponse;

                const blipEventRequest: CreateBlipEventApiRequest = {
                    comment: '',
                    parentId: Number(state.currentBlipEventId),
                    blipId: newBlipApi.id,
                    quadrantId: getQuadrantId(state, blip.sectorName),
                    ringId: getRingId(state, blip.ringName),
                    authorId: 100500,
                };

                const blipEventResponse = await fetchBaseQuery({
                    url: 'blip-events',
                    method: 'POST',
                    body: blipEventRequest,
                });

                if (blipEventResponse.error) return { error: blipEventResponse.error };
                return { data: blipEventResponse.data as CreateBlipEventApiResponse };
            },
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
    useGetRadarByVersionIdQuery,
    useGetAllRadarVersionsQuery,
    useSaveNewRadarMutation,
} = companyRadarsApi;
