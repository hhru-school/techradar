// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiSlice } from './authApi';
import { BlipResponse, UpdateBlipRequest } from './types';

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
        updateBlip: builder.mutation<BlipResponse, UpdateBlipRequest>({
            query: ({ blipId, body }) => ({
                url: `/blips/${blipId}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const { useGetBlipQuery, useUpdateBlipMutation } = singlePageBlipApi;
