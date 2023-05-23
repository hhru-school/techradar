import { GridRowId } from '@mui/x-data-grid';
import { Blip, RadarInterface } from '../components/radar/types';
import { RootState } from '../store/store';
import { apiSlice } from './authApi';
import { CreateRadarApiRequest, formatApiData } from './radarApiUtils';
import {
    CreateBlipApiResponse,
    CreateBlipEventApiRequest,
    CreateBlipEventApiResponse,
    CreateRadarVersionDataApi,
    IndexBlipEventApi,
    RadarApiDataResponse,
    RadarVersionData,
    UpdateVersionRequest,
    VersionApiResponse,
} from './types';

export interface RadarApi {
    id: number;
    name: string;
}

export const companyRadarsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => ({
                method: 'GET',
                url: `/radars?company-id=${companyId}`,
            }),
            providesTags: ['Radar'],
        }),

        getRadar: builder.query<RadarInterface, number>({
            query: (blipEventId) => ({
                method: 'GET',
                url: `/containers?blipEventId=${blipEventId}`,
            }),
            transformResponse: (rawResult: RadarApiDataResponse) => formatApiData(rawResult),
        }),

        getRadarByVersionId: builder.query<RadarInterface, number>({
            query: (radarVersionId) => ({
                method: 'GET',
                url: `containers?radar-version-id=${radarVersionId}`,
            }),

            transformResponse: (rawResult: RadarApiDataResponse) => formatApiData(rawResult),
            providesTags: ['Radar'],
        }),

        getRadarByBlipEventId: builder.query<RadarInterface, number>({
            query: (blipEventId) => ({
                method: 'GET',
                url: `containers?blip-event-id=${blipEventId}`,
            }),

            transformResponse: (rawResult: RadarApiDataResponse) => formatApiData(rawResult),
            providesTags: ['Radar'],
        }),

        getAllRadarVersions: builder.query<VersionApiResponse[], number>({
            query: (radarId) => `radar-versions/?radar-id=${radarId}`,
        }),

        getVersionById: builder.query<VersionApiResponse, number>({
            query: (versionId) => ({
                method: 'GET',
                url: `radar-versions/${versionId}`,
            }),
            providesTags: ['Version'],
        }),

        getBlipEventById: builder.query<IndexBlipEventApi, number>({
            query: (blipEventId) => ({
                method: 'GET',
                url: `blip-events/${blipEventId}`,
            }),
        }),

        saveNewRadar: builder.mutation<VersionApiResponse, CreateRadarApiRequest>({
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

        createBlip: builder.mutation<CreateBlipApiResponse, { blip: Blip; radarId: number }>({
            query: ({ blip, radarId }) => ({
                url: 'blips',
                method: 'POST',
                body: {
                    name: blip.name,
                    description: blip.description || '',
                    radarId: Number(radarId),
                },
            }),
        }),

        updateVersion: builder.mutation<VersionApiResponse, UpdateVersionRequest>({
            query: (version) => ({
                url: `radar-versions/${version.id}`,
                method: 'PUT',
                body: version,
            }),
            invalidatesTags: ['Radar', 'Version'],
        }),

        createBlipEvent: builder.mutation<CreateBlipEventApiResponse, CreateBlipEventApiRequest>({
            query: (body) => ({
                url: 'blip-events',
                method: 'POST',
                body,
            }),
        }),
        getBlipEventsForRadar: builder.query<IndexBlipEventApi[], number>({
            query: (blipEventId) => ({
                method: 'GET',
                url: `blip-events/radar-log?blip-event-id=${blipEventId}`,
            }),
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
    useGetRadarByVersionIdQuery,
    useGetRadarByBlipEventIdQuery,
    useGetAllRadarVersionsQuery,
    useGetVersionByIdQuery,
    useGetBlipEventByIdQuery,
    useCreateBlipMutation,
    useCreateBlipEventMutation,
    useUpdateVersionMutation,
    useSaveNewRadarMutation,
    useGetBlipEventsForRadarQuery,
	useDeleteRadarVersionsMutation
	useGetRadarVersionsQuery
} = companyRadarsApi;
