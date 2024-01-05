import axios from 'axios';

const API = axios.create({
    baseURL: 'https://api-birthday-reminder-5xlo.onrender.com/api/v1/friends',
});

class FriendService {
    async getAll() {
        return await API.get('/');
    }

    async findById(id) {
        return await API.get(`/${id}`);
    }

    async save(friend) {
        return await API.post('/', friend);
    }

    async update(id, friend) {
        return await API.put(`/${id}`, friend);
    }

    async delete(id) {
        return await API.delete(`/${id}`);
    }
}

const friendService = new FriendService();

export default friendService;
