import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}cart/`;

class CartService {
    getAllCarts() {
        return axios.get(API_URL);
    }

    getAllCartProducts() {
        return axios.get(`${API_URL}cartProduct`)
    }

    createOneCartProduct(product){
        return axios.post(`${API_URL}cartProduct`, product)
    }

    updateOneCartProduct(id, updatedProduct) {
        return axios.put (`${API_URL}cartProduct/single/${id}`, updatedProduct)
    }

    deleteOneCartProduct(id) {
        return axios.delete(`${API_URL}cartProduct/single/${id}`)
    }

    deleteManyCartProducts(cartId) {
        return axios.delete(`${API_URL}cartProduct/many/${cartId}`)
    }

    createOneCart( customerId ) {
        return axios.post(API_URL, customerId)
    }

}

export default new CartService();