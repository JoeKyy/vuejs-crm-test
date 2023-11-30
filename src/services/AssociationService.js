import api from "../api/axios";

export default {
    getAssociation() {
        return api.get('/association');
    },
    addAssociation(data) {
        return api.post('/association', data);
    },
    getOneAssociation(id) {
        return api.get('/association/' + id);
    },
    updateAssociation(id, data) {
        return api.patch('/association/' + id, data);
    },
    deleteAssociation(id) {
        return api.delete('/association/' + id);
    }
}
