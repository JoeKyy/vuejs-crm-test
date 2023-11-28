import api from "../api/axios";

export default {
    getProduct() {
        return api.get('/product')
    },
    addProduct(data) {
        return api.post('/product', data)
    },
    getOneProduct(id) {
        return api.get('/product/' + id)
    },
    updateProduct(id, data) {
        return api.patch('/product/' + id, data)
    },
    changeStatus(id, status) {
        return api.patch('/product/' + id, status)
    },
    deleteProduct(id) {
        return api.delete('/product/' + id)
    }
}