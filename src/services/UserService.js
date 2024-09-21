import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API_URI}/users`,
});

class UserService {
  async getAll() {
    return await API.get('/');
  }

  async findById(id) {
    return await API.get(`/${id}`);
  }

  async findByEmail(email) {
    return await API.get(`/email/${email}`);
  }

  async save(user) {
    return await API.post('/', user);
  }

  async update(id, user) {
    return await API.put(`/${id}`, user);
  }

  async delete(id) {
    return await API.delete(`/${id}`);
  }
}

const userService = new UserService();

export default userService;
