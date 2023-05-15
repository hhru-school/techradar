import { apiSlice } from '../api/authApi';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'authenticate',
                method: 'POST',
                body: credentials as { username: string; password: string },
            }),
        }),
        registr: builder.mutation({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials as { username: string; password: string; confirmPassword: string },
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
                body: '',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegistrMutation, useLogOutMutation } = authApiSlice;
