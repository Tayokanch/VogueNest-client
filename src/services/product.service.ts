import axios from "axios";
import { ProductI } from "./interface.ts";

class ProductService {
  getAllProducts() {
    return axios.get<ProductI[]>('https://api.foreverbuy.in/api/product/list');
  }
}

export default new ProductService();
