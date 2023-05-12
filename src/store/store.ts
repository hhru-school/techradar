import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { companyRadarsApi } from '../api/companyRadarsApi';
import activeBlipReducer from './activeBlipSlice';
import activeSectorReducer from './activeSectorSlice';
import authentificationReducer from './authentificationSlice';
import constructorRadarReducer from './constructorRadarSlice';
import editRadarReducer from './editRadarSlice';
import myRadarsReducer from './myRadarsSlice';
import myTechReducer from './myTechSlice';

const rootReducer = combineReducers({
    activeBlip: activeBlipReducer,
    activeSector: activeSectorReducer,
    editRadar: editRadarReducer,
    constructorRadar: constructorRadarReducer,
    myRadars: myRadarsReducer,
    myTech: myTechReducer,
    authentification: authentificationReducer,
    [companyRadarsApi.reducerPath]: companyRadarsApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(companyRadarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
