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

import { logOut, setCredentials } from '../store/authSlice';
import { RootState } from '../store/store';

export interface ErrorResponse {
    data: { message: string; status: string; timestamp: string };
    status: number;
}

export interface UserResponse {
    // eslint-disable-next-line camelcase
    type_token: string;
    // eslint-disable-next-line camelcase
    access_token: string;
    // eslint-disable-next-line camelcase
    refresh_token: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface ServerResponse {
    username: string | null;
    tokenAccess: string | null;
    refreshToken: string | null;
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const tokenAccess = (getState() as RootState).auth.tokenAccess;
        if (tokenAccess) {
            headers.set('Authorization', `Bearer ${tokenAccess}`);
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

    if (
        result?.error?.status === 'PARSING_ERROR' &&
        result?.error?.originalStatus &&
        (result?.error?.originalStatus === 403 ||
            result?.error?.originalStatus === 401 ||
            result?.error?.originalStatus === 500)
    ) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQueryRefresh('/auth/refresh', api, extraOptions);

                if (refreshResult?.data) {
                    const username: string | null = (api.getState() as RootState).auth.username;

                    api.dispatch(
                        setCredentials({
                            username,
                            tokenAccess: (refreshResult.data as UserResponse).access_token,
                            refreshToken: (refreshResult.data as UserResponse).refresh_token,
                        })
                    );

                    result = await baseQuery(args, api, extraOptions);
                } else {
                    await baseQuery('/auth/logout', api, extraOptions);
                    api.dispatch(logOut());
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({}),
});
