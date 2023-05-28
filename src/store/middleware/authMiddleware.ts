import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { ServerResponse } from '../../api/types';

export const authMiddleware: Middleware = () => (next) => (action: PayloadAction<ServerResponse>) => {
    if (action.type === 'auth/setCredentials') {
        const username = action.payload.username;
        const accessToken = action.payload.accessToken;
        const refreshToken = action.payload.refreshToken;

        if (typeof username === 'string' && typeof accessToken === 'string' && typeof refreshToken === 'string') {
            localStorage.setItem('username', username);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        }
    }

    return next(action);
};
