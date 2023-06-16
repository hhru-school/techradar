import { apiSlice } from './authApi';
import { CreateNewCompanyResponse, CreateNewCompanyRequest } from './types';

export interface CompanyData {
    id: number;
    name: string;
    lastSelected: boolean;
}

export const companiesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanies: builder.query<CompanyData[], void>({
            query: () => ({
                url: `/users/companies`,
                method: 'GET',
            }),
            providesTags: ['CreateCompany'],
        }),
        createNewCompany: builder.mutation<CreateNewCompanyResponse, CreateNewCompanyRequest>({
            query: (body) => ({
                url: `/companies`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['CreateCompany'],
        }),
    }),
});

export const { useGetCompaniesQuery, useCreateNewCompanyMutation } = companiesApi;
