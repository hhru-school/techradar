import { apiSlice } from './authApi';
import { CreateNewCompanyResponse, CreateNewCompanyRequest } from './types';

export interface CompanyData {
    id: number;
    name: string;
}

export interface CompanyStaff {
    id: number;
    username: string;
}

export const companiesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompanies: builder.query<CompanyData[], null | void>({
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
        getStaff: builder.query<CompanyStaff[], number>({
            query: (companyId) => ({
                url: `/companies/${companyId}/users`,
                method: 'GET',
            }),
            providesTags: ['staff'],
        }),
        setStaffItem: builder.mutation<void, { username: string; companyId: number }>({
            query: ({ username, companyId }) => ({
                url: `/users/${username}/companies/${companyId}`,
                method: 'POST',
            }),
            invalidatesTags: ['staff'],
        }),
        deleteStaffItem: builder.mutation<void, { username: string; companyId: number }>({
            query: ({ username, companyId }) => ({
                url: `/users/${username}/companies/${companyId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['staff'],
        }),
    }),
});

export const {
    useGetCompaniesQuery,
    useCreateNewCompanyMutation,
    useGetStaffQuery,
    useDeleteStaffItemMutation,
    useSetStaffItemMutation,
} = companiesApi;
