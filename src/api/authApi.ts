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

import { setCredentials, logOut } from '../store/authSlice';
import { RootState } from '../store/store';

export interface UserResponse {
    user: string;
    token: string;
}

export interface LoginRequest {
    user: string;
    password: string;
}
// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: 'http:/localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery(
        args,
        api,
        extraOptions
    );

    if (
        result?.error?.status === 'PARSING_ERROR' &&
        result?.error?.originalStatus &&
        (result?.error?.originalStatus === 403 || result?.error?.originalStatus === 401)
    ) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                // send refresh token to get new access token
                const refreshResult = await baseQuery('/refresh', api, extraOptions);

                if (refreshResult?.data) {
                    // store the new token

                    api.dispatch(setCredentials(refreshResult.data as { user: string; token: string }));

                    // retry the original query with new access token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logOut());
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
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
