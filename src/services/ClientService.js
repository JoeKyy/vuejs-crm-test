import api from "../api/axios";

export default {
    getClient() {
        return api.get('/client')
    },
    addClient(data) {
        return api.post('/client', data)
    },
    getOneClient(id) {
        return api.get('/client/' + id)
    },
    updateClient(id, data) {
        return api.patch('/client/' + id, data)
    },
    changeStatus(id, status) {
        return api.patch('/client/' + id, status)
    },
    deleteClient(id) {
        return api.delete('/client/' + id)
    }
}