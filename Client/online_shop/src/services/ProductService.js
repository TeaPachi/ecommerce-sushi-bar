import axios from 'axios';
const API_URL = `${process.env.REACT_APP_API_URL}product/`;

class ProductService {
    getAllProducts() {
        return axios.get(API_URL)
    }

    getAllProductCategories() {
        return axios.get(`${API_URL}category`)
    }

    updateProduct( id, updatedProduct ) {
        return axios.put(`${API_URL}single/${id}`, updatedProduct)
    }

    createProduct( product ) {
        return axios.post(API_URL, product)
    }
}

export default new ProductService();