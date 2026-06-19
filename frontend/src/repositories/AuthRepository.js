import api from '../api/axios';

class AuthRepository {

    login(data) {
        return api.post('/login', data);
    }

    register(data) {
        return api.post('/register', data);
    }

    profile() {
        return api.get('/profile');
    }

    logout() {
        return api.post('/logout');
    }
}

export default new AuthRepository();