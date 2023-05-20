import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

// Все радары компании:
// http://localhost:8080/api/radars?companyId=1
// Конкретный радар:
// http://localhost:8080/api/radars/1

// создание радара за один раз: /api/containers
// Создать новую версию для радара POST на /api/radar_versions
// Получить все версии радара: GET на api/radar_versions?radarId=1
// Получение радара определенной версии (по blipEventId): GET на api/containers?blipEventId=77
// Получить лог радара: GET на api/blip_events/radar_log?blipEventId=78

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => `/radars?company-id=${companyId}`,
        }),

        getRadar: builder.query<FormattedRadarData, number>({
            query: (blipEventId) => `/containers?blipEventId=${blipEventId}`,
            transformResponse: (rawResult: ApiRadarData) => formatApiData(rawResult),
        }),

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
        }),
    }),
});

export const { useGetAllCompanyRadarsQuery, useGetRadarQuery, useGetAllRadarVersionsQuery, useSaveNewRadarMutation } =
    companyRadarsApi;

export const {
    useGetAllCompanyRadarsQuery,
    useGetRadarQuery,
    useGetRadarVersionsQuery,
    useDeleteRadarVersionsMutation,
} = authApiSlice;
