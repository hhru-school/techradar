import { apiSlice } from '../api/authApi';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials } as { user: string; token: string },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
