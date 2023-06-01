import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type BlipResponse = {
    id: number;
    name: string;
    description: string;
    radarId: number;
};

const baseUrl = '/api';

export const singlePageBlipApi = createApi({
    reducerPath: 'singlePageBlipApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getBlip: builder.query<BlipResponse, number>({
            query: (blipId) => `/blips/${blipId}`,
        }),
    }),
});

export const { useGetBlipQuery } = singlePageBlipApi;
