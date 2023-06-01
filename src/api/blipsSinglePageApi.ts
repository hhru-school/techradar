// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiSlice } from './authApi';

type BlipResponse = {
    id: number;
    name: string;
    description: string;
    radarId: number;
};

type UpdateBlipRequest = { blipId: number; body: { name: string; description: string } };
type UpdateBlipResponse = {
    id: number;
    name: string;
    description: string;
    radarId: number;
};
// const baseUrl = '/api';

// export const singlePageBlipApi = createApi({
//     reducerPath: 'singlePageBlipApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({
//         getBlip: builder.query<BlipResponse, number>({
//             query: (blipId) => `/blips/${blipId}`,
//         }),
//     }),
// });

// export const { useGetBlipQuery } = singlePageBlipApi;

export const singlePageBlipApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlip: builder.query<BlipResponse, number>({
            query: (blipId) => `/blips/${blipId}`,
        }),
        updateBlip: builder.mutation<UpdateBlipResponse, UpdateBlipRequest>({
            query: ({ blipId, body }) => ({
                url: `/blips/${blipId}`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetBlipQuery, useUpdateBlipMutation } = singlePageBlipApi;
