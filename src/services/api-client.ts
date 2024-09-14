import axios from 'axios';
import { FormData, LoginData } from './interface';

class VogueNestService {
  http = axios.create({
    baseURL: 'http://localhost:8050/api/voguenest',
  });

  async createUser(data: FormData) {
    const response = await this.http.post<FormData>('/signup', data);
    return response;
  }

  async Login(data: LoginData) {
    const response = await this.http.post<LoginData>('/login', data, {
      withCredentials: true,
    });
    return response.data;
  }

  async validateCookie(){
    const response = await this.http.post('/cookie-validator', {}, {
      withCredentials:true
    });
    return response.data
  }
}

export default new VogueNestService();
