import { configureStore } from '@reduxjs/toolkit';

import activeBlipReducer from './activeBlipSlice';

export const store = configureStore({
    reducer: {
        activeBlip: activeBlipReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
