import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    fetchBaseQuery,
    BaseQueryFn,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    createApi,
    FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { signOut, setCredentials } from '../store/authSlice/authSlice';
import { RootState } from '../store/store';
import { SignInResponse } from './types';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryRefresh = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const refreshToken = (getState() as RootState).auth.refreshToken;
        if (refreshToken) {
            headers.set('Authorization', `Bearer ${refreshToken}`);
        }
        return headers;
    },
    method: 'POST',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    await mutex.waitForUnlock();

    let result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery(
        args,
        api,
        extraOptions
    );

    if (result?.error?.status === 403 || result?.error?.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQueryRefresh('/auth/refresh', api, extraOptions);
                if (refreshResult?.data) {
                    const username: string | null = (api.getState() as RootState).auth.username;
                    api.dispatch(
                        setCredentials({
                            username,
                            accessToken: (refreshResult.data as SignInResponse).accessToken,
                            refreshToken: (refreshResult.data as SignInResponse).refreshToken,
                        })
                    );

                    result = await baseQuery(args, api, extraOptions);
                } else {
                    await baseQuery('/auth/logout', api, extraOptions);
                    api.dispatch(signOut());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Radar', 'Version'],
});
