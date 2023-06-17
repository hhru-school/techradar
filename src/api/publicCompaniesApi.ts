import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

import { CompanyData } from './companiesApi';

export const publicCompaniesApi = createApi({
    reducerPath: 'publicCompanies',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getAllCompanies: builder.query<CompanyData[], void>({
            query: () => ({
                url: '/companies',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAllCompaniesQuery } = publicCompaniesApi;
