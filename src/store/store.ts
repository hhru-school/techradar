import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../api/authApi';
import { singlePageBlipApi } from '../api/blipsSinglePageApi';
import { companyRadarsApi } from '../api/companyRadarsApi';
import { radarsGridApi } from '../api/radarsGridApi';
import activeBlipReducer from './activeBlipSlice';
import authReducer from './authSlice/authSlice';
import constructorRadarReducer from './constructorRadarSlice';
import displayRadarReducer from './displayRadarSlice';
import editRadarReducer from './editRadarSlice';
import { authMiddleware } from './middleware/authMiddleware';
import myRadarsReducer from './myRadarsSlice';
import techSinglePageReducer from './techSinglePageSlice';

const rootReducer = combineReducers({
    activeBlip: activeBlipReducer,
    displayRadar: displayRadarReducer,
    editRadar: editRadarReducer,
    constructorRadar: constructorRadarReducer,
    myRadars: myRadarsReducer,
    auth: authReducer,
    techSinglePage: techSinglePageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [companyRadarsApi.reducerPath]: companyRadarsApi.reducer,
    [radarsGridApi.reducerPath]: radarsGridApi.reducer,
    [singlePageBlipApi.reducerPath]: singlePageBlipApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            apiSlice.middleware,
            companyRadarsApi.middleware,
            radarsGridApi.middleware,
            singlePageBlipApi.middleware,
            authMiddleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
