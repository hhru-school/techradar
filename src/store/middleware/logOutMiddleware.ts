import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

export const logOutMiddleware: Middleware = () => (next) => (action: PayloadAction) => {
    if (action.type === 'auth/signOut') {
        localStorage.removeItem('user');
    }

    return next(action);
};
