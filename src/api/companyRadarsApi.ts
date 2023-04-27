import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiRadarData } from './radarApiUtils';

const baseUrl = '/api/radars';

export interface RadarApi {
    id: number;
    name: string;
}

// Все радары компании:
// http://localhost:8080/api/radars?companyId=1
// Конкретный радар:
// http://localhost:8080/api/radars/1

export const companyRadarsApi = createApi({
    reducerPath: 'companyRadarsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => `?companyId=${companyId}`,
        }),
        getRadar: builder.query<ApiRadarData, number>({
            query: (radarId) => `/${radarId}`,
        }),
    }),
});

export const { useGetAllCompanyRadarsQuery, useGetRadarQuery } = companyRadarsApi;
