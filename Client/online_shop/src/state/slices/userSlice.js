import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    street: '',
    email: '',
    admin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isAdmin(state, {payload}){
            console.log(`current user is admin? ${payload}`)
            state.admin = payload
        },
        setUser(state, {payload}){
            state.id = payload._id
            state.firstName = payload.firstName
            state.lastName = payload.lastName
            state.username = payload.username
            state.city = payload.city
            state.street = payload.street
            console.log(`user state is now ${JSON.stringify(state)}`)
        }
    }
})

export const { isAdmin, setUser } = userSlice.actions
export default userSlice.reducer