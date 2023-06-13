import { apiSlice } from './authApi';

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
        }),
    }),
});

export const { useGetCompaniesQuery } = companiesApi;
