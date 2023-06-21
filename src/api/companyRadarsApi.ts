import { Blip, RadarInterface } from '../components/radar/types';
import { Segment } from '../store/editRadarSlice';
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

        getCompanyName: builder.query<string, number>({
            query: (companyId) => ({
                method: 'GET',
                url: `/companies/${companyId}`,
            }),
            transformResponse: (rawResult: { id: number; name: string }) => rawResult.name,
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
            invalidatesTags: ['Radar', 'Version', 'Log'],
        }),

        createBlipEvent: builder.mutation<CreateBlipEventApiResponse, CreateBlipEventApiRequestParams>({
            query: ({ body, versionId }) => ({
                url: `blip-events?radar-version-id=${versionId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['LastBlipEvent'],
        }),

        getRadarLog: builder.query<IndexBlipEventApi[], number>({
            query: (versionId) => ({
                method: 'GET',
                url: `blip-events/radar-log?radar-version-id=${versionId}`,
            }),
            providesTags: ['Log'],
        }),

        updateSector: builder.mutation<RenameContainerItemApi, RenameContainerItemApi>({
            query: ({ id, name }) => ({
                method: 'PUT',
                url: `quadrants/${id}`,
                body: { name },
            }),
            invalidatesTags: ['Radar'],
        }),

        updateRing: builder.mutation<RenameContainerItemApi, RenameContainerItemApi>({
            query: ({ id, name }) => ({
                method: 'PUT',
                url: `rings/${id}`,
                body: { name },
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

            invalidatesTags: ['Radar', 'Version', 'Log'],
        }),

        updateBlipEventComment: builder.mutation<UpdateBlipEventApiResponse, { id: number; comment: string }>({
            query: ({ id, comment }) => ({
                method: 'PUT',
                url: `blip-events/${id}`,
                body: { comment },
            }),

            invalidatesTags: ['Log'],
        }),

        updateBlipEventSegment: builder.mutation<
            UpdateBlipEventApiResponse,
            { id: number; segment?: Segment; comment?: string }
        >({
            query: ({ id, segment, comment }) => ({
                method: 'PUT',
                url: `blip-events/${id}`,
                body: { quadrantId: segment?.sector.id || null, ringId: segment?.ring.id || null, comment },
            }),

            invalidatesTags: ['Radar', 'Log'],
        }),

        getLastBlipEvent: builder.query<IndexBlipEventApi, { blipId: number; versionId: number }>({
            query: ({ blipId, versionId }) => ({
                method: 'GET',
                url: `blip-events/last-blip-event?blip-id=${blipId}&radar-version-id=${versionId}`,
            }),
            providesTags: ['LastBlipEvent'],
        }),

        deleteVersion: builder.mutation<void, number>({
            query: (versionId) => ({
                method: 'DELETE',
                url: `/radar-versions/${versionId}`,
            }),
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
    useUpdateBlipEventSegmentMutation,
    useGetLastBlipEventQuery,
    useDeleteVersionMutation,
    useGetCompanyNameQuery,
} = companyRadarsApi;
