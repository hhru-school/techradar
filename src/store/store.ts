import { combineReducers, configureStore } from '@reduxjs/toolkit';

import activeBlipReducer from './activeBlipSlice';
import activeSectorReducer from './activeSectorSlice';

const rootReducer = combineReducers({ activeBlip: activeBlipReducer, activeSector: activeSectorReducer });

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
