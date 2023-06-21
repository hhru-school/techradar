import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

export const logOutMiddleware: Middleware = () => (next) => (action: PayloadAction) => {
    if (action.type === 'auth/signOut') {
        try {
            localStorage.removeItem('user');
        } catch (e) {
            throw new Error((e as Error).message);
        }
        try {
            localStorage.removeItem('currentCompany');
        } catch (e) {
            throw new Error((e as Error).message);
        }
    }

    return next(action);
};
