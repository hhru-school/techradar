import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../api/authApi';
import { companyRadarsApi } from '../api/companyRadarsApi';
import { radarsGridApi } from '../api/radarsGridApi';
import activeBlipReducer from './activeBlipSlice';
import activeSectorReducer from './activeSectorSlice';
import authReducer from './authSlice/authSlice';
import constructorRadarReducer from './constructorRadarSlice';
import editRadarReducer from './editRadarSlice';
import { authMiddleware } from './middleware/authMiddleware';
import myRadarsReducer from './myRadarsSlice';

const rootReducer = combineReducers({
    activeBlip: activeBlipReducer,
    activeSector: activeSectorReducer,
    editRadar: editRadarReducer,
    constructorRadar: constructorRadarReducer,
    myRadars: myRadarsReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [companyRadarsApi.reducerPath]: companyRadarsApi.reducer,
    [radarsGridApi.reducerPath]: radarsGridApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            apiSlice.middleware,
            companyRadarsApi.middleware,
            radarsGridApi.middleware,
            authMiddleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
