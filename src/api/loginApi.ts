import { apiSlice } from './authApi';
import { SignInValues, SignInResponse, SignUpValues, SignUpResponse } from './types';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInResponse, SignInValues>({
            query: (credentials) => ({
                url: '/auth/authenticate',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.mutation<SignUpResponse, SignUpValues>({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useLogOutMutation } = authApiSlice;
