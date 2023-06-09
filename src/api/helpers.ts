import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { ErrorWithType } from './types';

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        /* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access*/
        typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string'
        /* eslint-enable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access*/
    );
}

export function isErrorWithType(error: unknown): error is ErrorWithType {
    return (
        /* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access*/
        typeof error === 'object' &&
        error != null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data != null &&
        'type' in error.data &&
        'message' in error.data &&
        typeof (error.data as any).type === 'string' &&
        typeof (error.data as any).message === 'string' &&
        'status' in error
        /* eslint-enable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access*/
    );
}
