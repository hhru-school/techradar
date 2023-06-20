import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { CreateNewCompanyResponse } from '../../api/types';

export const companyMiddleware: Middleware = () => (next) => (action: PayloadAction<CreateNewCompanyResponse>) => {
    if (action.type === 'company/setCurrentCompany') {
        const company = action.payload;

        try {
            localStorage.setItem('currentCompany', JSON.stringify(company));
        } catch (e) {
            throw new Error((e as Error).message);
        }
    }

    return next(action);
};
