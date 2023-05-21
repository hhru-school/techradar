import { apiSlice } from '../api/authApi';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/authenticate',
                method: 'POST',
                body: credentials as { username: string; password: string },
            }),
        }),
        registr: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials as { username: string; password: string; confirmPassword: string },
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                body: '',
            }),
        }),
        getCompanies: builder.query({
            query: () => ({
                url: '/companies',
                method: 'GET',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegistrMutation, useLogOutMutation, useGetCompaniesQuery } = authApiSlice;
