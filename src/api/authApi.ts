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

import {
    // setCredentials,
    logOut,
    // , setCredentials,
} from '../store/authSlice';
import { RootState } from '../store/store';

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
// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: '/api/auth',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const refreshToken = (getState() as RootState).auth.refreshToken;
        if (refreshToken) {
            headers.set('authorization', `Bearer ${refreshToken}`);
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
                // console.log('sending refresh token');
                // send refresh token to get new access token
                const refreshResult = await baseQuery('/refresh', api, extraOptions);

                // console.log(refreshResult);
                if (refreshResult?.data) {
                    // store the new token
                    // const username: string = api.getState().auth.username;

                    // api.dispatch(
                    //     setCredentials({
                    //         username,
                    //         tokenAccess: refreshResult.data.access_token,
                    //         refreshToken: refreshResult.data.refresh_token,
                    //     })
                    // );

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
