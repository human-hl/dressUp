import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dashboardReducer from './slices/dashboardSlice';
import itemsReducer from "./slices/itemsSlice";
import outfitsReducer from './slices/outfitsSlice';
import tipsReducer from './slices/tipsSlice';
import profileReducer from './slices/profileSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        dashboard: dashboardReducer,
        items: itemsReducer,
        outfits: outfitsReducer,
        tips: tipsReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;