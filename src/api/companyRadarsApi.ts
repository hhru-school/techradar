import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Blip } from '../components/radar/types';
import { EditRadarState, setCurrenBlipEventId } from '../store/editRadarSlice';
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
const baseUrl = '/api/';

const getQuadrantId = (state: EditRadarState, sectorName: string): number => {
    if (!state.sectors) return -1;
    return state.sectors.find((sector) => sector.name === sectorName)?.id || -1;
};

const getRingId = (state: EditRadarState, ringName: string): number => {
    if (!state.rings) return -1;
    return state.rings.find((ring) => ring.name === ringName)?.id || -1;
};

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

// Все радары компании:
// http://localhost:8080/api/radars?companyId=1
// Конкретный радар:
// http://localhost:8080/api/radars/1

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
            query: (companyId) => `/radars?companyId=${companyId}`,
        }),

        getRadar: builder.query<BasicRadarData, number>({
            query: (blipEventId) => `/containers?blipEventId=${blipEventId}`,
            transformResponse: (rawResult: RadarApiDataResponse) => formatApiData(rawResult),
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
        }),

        addNewBlipToRadar: builder.mutation<CreateBlipEventApiResponse, Blip>({
            async queryFn(blip, { getState, dispatch }, _, fetchBaseQuery) {
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

                const newApiBlip = blipResponse.data as CreateBlipApiResponse;

                const blipEventRequest: CreateBlipEventApiRequest = {
                    comment: '',
                    parentId: Number(state.currentBlipEventId),
                    blipId: newApiBlip.id,
                    quadrantId: getQuadrantId(state, blip.sectorName),
                    ringId: getRingId(state, blip.ringName),
                    authorId: 1,
                };

                const blipEventResponse = await fetchBaseQuery({
                    url: 'blip-events',
                    method: 'POST',
                    body: blipEventRequest,
                });

                if (blipEventResponse.error) return { error: blipEventResponse.error };
                const blipEvent = blipEventResponse.data as CreateBlipEventApiResponse;
                dispatch(setCurrenBlipEventId(blipEvent.id));
                return { data: blipEvent };
            },
        }),
    }),
});

export const {
    useGetAllCompanyRadarsQuery,
    useGetRadarQuery,
    useGetRadarByVersionIdQuery,
    useGetAllRadarVersionsQuery,
    useAddNewBlipToRadarMutation,
    useSaveNewRadarMutation,
} = companyRadarsApi;
export const { useGetAllCompanyRadarsQuery, useGetRadarQuery, useSaveNewRadarMutation } = companyRadarsApi;
