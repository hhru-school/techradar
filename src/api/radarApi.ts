import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type RadarData = Array<{
    blipEventId: number;
    creationTime: string;
    id: number;
    lastChangeTime: string;
    name: string;
    radarId: number;
    release: boolean;
}>;

const baseUrl = '/api/radar_versions';

export const radarApi = createApi({
    reducerPath: 'RadarApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getRadarVersions: builder.query<RadarData, number>({
            query: (radarId) => `?radarId=${radarId}`,
        }),
    }),
});

export const { useGetRadarVersionsQuery } = radarApi;
