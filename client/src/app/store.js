import {configureStore} from '@reduxjs/toolkit';
import { usersApiSlice } from '../features/users/usersApiSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer:{
        [usersApiSlice.reducerPath]:usersApiSlice.reducer
    },

    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
})

