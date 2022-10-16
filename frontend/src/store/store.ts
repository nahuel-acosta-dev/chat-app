import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../app/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import profileSlice from '../features/profile/profileSlice';

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        profile: profileSlice
    },

    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true //cambiar a false al llevar a produccion
});