import { combineReducers, configureStore } from '@reduxjs/toolkit';

import activeBlipReducer from './activeBlipSlice';
import activeSectorReducer from './activeSectorSlice';
import authentificationReducer from './authentificationSlice';
import constructorRadarReducer from './constructorRadarSlice';
import myRadarsReducer from './myRadarsSlice';
import myTechReducer from './myTechSlice';

const rootReducer = combineReducers({
    activeBlip: activeBlipReducer,
    activeSector: activeSectorReducer,
    constructorRadar: constructorRadarReducer,
    myRadars: myRadarsReducer,
    myTech: myTechReducer,
    authentification: authentificationReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
