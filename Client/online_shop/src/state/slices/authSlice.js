import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuth(state, {payload}){
            state.isAuth = payload
            // console.log(`auth is now ` + state.isAuth, ` payload was ` + payload)
        }
    }
})

export const { toggleAuth } = authSlice.actions
export default authSlice.reducer

