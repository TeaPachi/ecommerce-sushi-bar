import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    city: '',
    street: ''
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        changeAddress(state, {payload}){
            state.city = payload.city
            state.street = payload.street
            console.log('your new address is' + payload.city + payload.street) //give it an object like {city: "tel aviv", street: "abc123"}
        }
    }
})

export const { changeAddress } = addressSlice.actions
export default addressSlice.reducer