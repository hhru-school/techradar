import { configureStore } from '@reduxjs/toolkit';

import activeBlipReducer from './activeBlipSlice';
import activeSectorReducer from './activeSectorSlice';

export const store = configureStore({
    reducer: {
        activeBlip: activeBlipReducer,
        activeSector: activeSectorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
