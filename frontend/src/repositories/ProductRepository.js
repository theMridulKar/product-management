import api from '../api/axios';

const ProductRepository = {

    getAll(page = 1, perPage = 10, search = '') {

        return api.get(
            `/products?page=${page}&per_page=${perPage}&search=${search}`
        );
    },

    create(data) {
        return api.post('/products', data);
    },

    find(id) {
        return api.get(`/products/${id}`);
    },

    update(id, data) {
        return api.put(`/products/${id}`, data);
    },

    delete(id) {
        return api.delete(`/products/${id}`);
    }
};

export default ProductRepository;