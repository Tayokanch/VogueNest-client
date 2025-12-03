import axios from 'axios';
import { FormData, LoginData, Order } from './interface';
import { LoggedUserI } from '../contexts/AuthContext';

interface logoutResponseI {
  message: string;
}

class VogueNestService {
  http = axios.create({
    baseURL: 'https://vogueshoppingapi.tayolabs.dev/api',
  });

  // Helper method to create authenticated request config
  private getAuthConfig(token?: string | null) {
    const config: any = {
      withCredentials: true,
    };
    
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    
    return config;
  }

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

  async validateCookie(token?: string | null) {
    const config = this.getAuthConfig(token);
    const response = await this.http.post('/cookie-validator', {}, config);
    return response.data;
  }

  async getUserOrder(token?: string | null) {
    const config = this.getAuthConfig(token);
    const order = await this.http.get<Order[]>('/orders', config);
    return order.data;
  }

  async logOut(token?: string | null): Promise<string> {
    const config = this.getAuthConfig(token);
    const res = await this.http.post<logoutResponseI>('/sign-out', {}, config);
    return res.data.message;
  }
}

export default new VogueNestService();
