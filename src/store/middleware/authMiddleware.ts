import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { ServerResponse } from '../../api/types';

export const authMiddleware: Middleware = () => (next) => (action: PayloadAction<ServerResponse>) => {
    if (action.type === 'auth/setCredentials') {
        const username = action.payload.username;
        const accessToken = action.payload.accessToken;
        const refreshToken = action.payload.refreshToken;

        if (typeof username === 'string' && typeof accessToken === 'string' && typeof refreshToken === 'string') {
            const user = {
                username,
                accessToken,
                refreshToken,
            };
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                throw new Error((e as Error).message);
            }
        }
    }

    return next(action);
};
