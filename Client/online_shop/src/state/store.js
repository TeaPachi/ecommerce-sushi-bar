import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import addressReducer from './slices/addressSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: { user: userReducer, address: addressReducer, auth: authReducer }
})