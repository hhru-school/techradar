import { apiSlice } from './authApi';
import { CompanyData } from './companiesApi';

export const publicCompaniesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCompanies: builder.query<CompanyData[], void>({
            query: () => ({
                url: '/companies/companies-with-radars',
                method: 'GET',
            }),
            providesTags: ['Radar'],
        }),
    }),
});
export const { useGetAllCompaniesQuery } = publicCompaniesApi;
