import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = '/api/radars';

export interface RadarApi {
    id: number;
    name: string;
}

export const companyRadarsApi = createApi({
    reducerPath: 'companyRadarsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCompanyRadars: builder.query<RadarApi[], number>({
            query: (companyId) => `?companyId=${companyId}`,
        }),
    }),
});

export const { useGetCompanyRadarsQuery } = companyRadarsApi;
