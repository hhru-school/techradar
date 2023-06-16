import { Blip, RadarInterface } from '../components/radar/types';
import { RootState } from '../store/store';
import { apiSlice } from './authApi';
import { CreateRadarApiRequest, formatApiData } from './radarApiUtils';
import {
    CreateBlipApiResponse,
    CreateBlipEventApiRequestParams,
    CreateBlipEventApiResponse,
    CreateRadarVersionDataApi,
    IndexBlipEventApi,
    RadarApiDataResponse,
    RenameContainerItemApi,
    UpdateBlipEventApiResponse,
    UpdateRadarApiRequest,
    UpdateRadarApiResponse,
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

        getLastReleasedVersion: builder.query<VersionApiResponse, number>({
            query: (radarId) => ({
                method: 'GET',
                url: `radar-versions/last-released-version?radar-id=${radarId}`,
            }),
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
                    name: state.editRadar.version.name,
                    release: false,
                    radarId: newRadar.radar.id,
                    blipEventId: Number(newRadar.blipEventId),
                };

                const result = await fetchBaseQuery({
                    url: 'radar-versions?link-to-last-release=false',
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

        createBlipEvent: builder.mutation<CreateBlipEventApiResponse, CreateBlipEventApiRequestParams>({
            query: ({ body, versionId }) => ({
                url: `blip-events?radar-version-id=${versionId}`,
                method: 'POST',
                body,
            }),
        }),
        getRadarLog: builder.query<IndexBlipEventApi[], number>({
            query: (blipEventId) => ({
                method: 'GET',
                url: `blip-events/radar-log?blip-event-id=${blipEventId}`,
            }),
            providesTags: ['Log'],
        }),

        updateSector: builder.mutation<RenameContainerItemApi, RenameContainerItemApi>({
            query: (body) => ({
                method: 'PUT',
                url: `quadrants/${body.id}`,
                body,
            }),
            invalidatesTags: ['Radar'],
        }),

        updateRing: builder.mutation<RenameContainerItemApi, RenameContainerItemApi>({
            query: (body) => ({
                method: 'PUT',
                url: `rings/${body.id}`,
                body,
            }),
            invalidatesTags: ['Radar'],
        }),

        updateRadar: builder.mutation<UpdateRadarApiResponse, UpdateRadarApiRequest>({
            query: (body) => ({
                method: 'PUT',
                url: `radars/${body.id}`,
                body,
            }),
            invalidatesTags: ['Radar'],
        }),

        deleteBlipEvent: builder.mutation<void, number>({
            query: (blipEventId) => ({
                method: 'DELETE',
                url: `blip-events/${blipEventId}`,
            }),

            async onQueryStarted(blipEventId, { getState, dispatch, queryFulfilled }) {
                const state = (getState() as RootState).editRadar;
                if (!state.log) throw new Error('Empty log on delete blipEvent');
                const currentBlipEventId = state.version.blipEventId;
                const updatedLog = state.log.filter((blipEvent) => blipEventId !== blipEvent.id);

                const result = dispatch(
                    companyRadarsApi.util.updateQueryData('getRadarLog', currentBlipEventId, () => updatedLog)
                );
                try {
                    await queryFulfilled;
                } catch {
                    result.undo();
                }
            },

            invalidatesTags: ['Radar', 'Version'],
        }),

        updateBlipEventComment: builder.mutation<UpdateBlipEventApiResponse, { id: number; comment: string }>({
            query: ({ id, comment }) => ({
                method: 'PUT',
                url: `blip-events/${id}`,
                body: { comment },
            }),

            invalidatesTags: ['Log'],
        }),
    }),
});

export const {
    useGetAllCompanyRadarsQuery,
    useGetRadarQuery,
    useGetRadarByVersionIdQuery,
    useGetRadarByBlipEventIdQuery,
    useGetAllRadarVersionsQuery,
    useGetLastReleasedVersionQuery,
    useGetVersionByIdQuery,
    useGetBlipEventByIdQuery,
    useCreateBlipMutation,
    useCreateBlipEventMutation,
    useUpdateVersionMutation,
    useSaveNewRadarMutation,
    useGetRadarLogQuery,
    useUpdateSectorMutation,
    useUpdateRadarMutation,
    useUpdateRingMutation,
    useDeleteBlipEventMutation,
    useUpdateBlipEventCommentMutation,
} = companyRadarsApi;
