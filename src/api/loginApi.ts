import { RegistrationValues } from '../components/modals/registrationFormModal/RegistrationFormModal';
import { LoginRequest, apiSlice } from './authApi';

export interface RadarApi {
    id: number;
    name: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/authenticate',
                method: 'POST',
                body: credentials as LoginRequest,
            }),
        }),
        registr: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials as RegistrationValues,
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                body: '',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegistrMutation, useLogOutMutation } = authApiSlice;
