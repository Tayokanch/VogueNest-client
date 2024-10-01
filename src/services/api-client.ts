import axios from 'axios';
import { FormData, LoggedUserI, LoginData, Order } from './interface';

interface logoutResponseI{
  message: string
}
class VogueNestService {
  http = axios.create({
    baseURL: 'http://localhost:8050/api/voguenest',
  });

  async createUser(data: FormData) {
    const response = await this.http.post<FormData>('/signup', data);
    return response;
  }

  async Login(data: LoginData) {
    const response = await this.http.post<LoggedUserI>('/login', data, {
      withCredentials: true,
    });
    return response.data;
  }

  async validateCookie() {
    const response = await this.http.post(
      '/cookie-validator',
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }

  async getUserOrder() {
    const order = await this.http.get<Order[]>('/orders', {
      withCredentials: true,
    });

    return order.data;
  }
  async logOut():Promise<string> {
   const res = await this.http.post<logoutResponseI>(
      '/sign-out',
      {},
      {
        withCredentials: true,
      }
    );
    return res.data.message
  }

}

export default new VogueNestService();
