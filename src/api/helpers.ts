import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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
