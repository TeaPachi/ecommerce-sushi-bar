import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}auth/`

class AuthService {
    login( user ) {
        return axios.post(`${API_URL}login`, user) 
    }
    
    register( newUser ){
        return axios.post(`${API_URL}register`, newUser)
    }

    logout() {
        return axios.delete(`${API_URL}logout`)
    }
} 

export default new AuthService();