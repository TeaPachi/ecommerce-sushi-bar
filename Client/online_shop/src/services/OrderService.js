import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}order/`;

class OrderService {
    createOneOrder(order){
        return axios.post(`${API_URL}`, order)
    }

}

export default new OrderService();