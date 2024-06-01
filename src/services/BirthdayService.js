import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api-birthday-reminder-5xlo.onrender.com/api/v1/birthdays',
});

class BirthdayService {
  async getAll() {
    return await API.get('/');
  }

  async findById(id) {
    return await API.get(`/${id}`);
  }

  async save(birthday) {
    return await API.post('/', birthday);
  }

  async update(id, birthday) {
    return await API.put(`/${id}`, birthday);
  }

  async delete(id) {
    return await API.delete(`/${id}`);
  }

  async getBirthdaysForUserByEmail(email) {
    return await API.get(`/email/${email}`);
  }
}

const birthdayService = new BirthdayService();

export default birthdayService;
