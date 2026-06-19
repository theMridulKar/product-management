import api from '../api/axios';

class CategoryRepository {

    getAll(page = 1, perPage = 10, search = '') {
        return api.get(
            `/categories?page=${page}&per_page=${perPage}&search=${search}`
        );
    }

    create(data) {
        return api.post('/categories', data);
    }

    update(id, data) {
        return api.put(`/categories/${id}`, data);
    }

    delete(id) {
        return api.delete(`/categories/${id}`);
    }
}

export default new CategoryRepository();