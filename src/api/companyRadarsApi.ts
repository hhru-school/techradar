import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Blip, RadarInterface } from '../components/radar/types';
import { setCurrenBlipEventId } from '../store/editRadarSlice';
import { RootState } from '../store/store';
import {
    CreateRadarApiRequest,
    RadarApiDataResponse,
    formatApiData,
    CreateRadarVersionDataApi,
    VersionApiResponse,
    CreateBlipEventApiResponse,
    CreateBlipEventApiRequest,
    CreateBlipApiRequest,
    CreateBlipApiResponse,
} from './radarApiUtils';

const baseUrl = '/api/';

export interface RadarApi {
    id: number;
    name: string;
}

/*
*****************

Пока не подключена авторизация, accsess токен прописывается хардкодом в header запроса:
Получить токен:

fetch('http://localhost:8080/api/auth/authenticate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
        username: 'user@hh.ru',
        password: '123',
    }),
})
    .then((response) => response.json())
    .then(console.log);
******************
{
    "typeToken": "Bearer",
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGhoLnJ1IiwiaWF0IjoxNjg1MDk0Mjg3LCJleHAiOjE2ODUxMzAyODd9.4snelK7oOx6Kyq3opHd492ooWDAo1kPT5EClnMDp810",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGhoLnJ1IiwiaWF0IjoxNjg1MDk0Mjg3LCJleHAiOjE2ODUxMzAyODd9.4snelK7oOx6Kyq3opHd492ooWDAo1kPT5EClnMDp810"
}
*/

const accessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGhoLnJ1IiwiaWF0IjoxNjg1MTg2OTA5LCJleHAiOjE2ODUyMjI5MDl9.WVhzOapX-Fx5MWO-6MGw_0mAkIEUFsL_FMX_-mlwCcY';

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

export const companyRadarsApi = createApi({
    reducerPath: 'companyRadarsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => ({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'GET',
                url: `/radars?company-id=${companyId}`,
            }),
        }),

        getRadar: builder.query<RadarInterface, number>({
            query: (blipEventId) => ({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'GET',
                url: `/containers?blipEventId=${blipEventId}`,
            }),
            transformResponse: (rawResult: RadarApiDataResponse) => formatApiData(rawResult),
        }),

        getRadarByVersionId: builder.query<RadarInterface, number>({
            query: (radarVersionId) => ({
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                method: 'GET',
                url: `containers?radar-version-id=${radarVersionId}`,
            }),
            transformResponse: (rawResult: RadarApiDataResponse) => formatApiData(rawResult),
        }),

        getAllRadarVersions: builder.query<VersionApiResponse[], number>({
            query: (radarId) => `radar-versions/?radar-id=${radarId}`,
        }),

        saveNewRadar: builder.mutation<VersionApiResponse, CreateRadarApiRequest>({
            async queryFn(radarData, { getState }, _options, fetchBaseQuery) {
                const radarResponse = await fetchBaseQuery({
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
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
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
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
                    radarId: Number(state.radar.id),
                };

                const blipResponse = await fetchBaseQuery({
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
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
                    quadrantId: blip.sector.id,
                    ringId: blip.ring.id,
                    authorId: 1,
                };

                const blipEventResponse = await fetchBaseQuery({
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
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

        createBlipEvent: builder.mutation<CreateBlipEventApiResponse, CreateBlipEventApi>({
            query: (body) => ({ url: `/api/blip-events`, method: 'POST', body }),
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
