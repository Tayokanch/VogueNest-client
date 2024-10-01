import axios from "axios";
import { ProductI } from "./interface.ts";

class ProductService {
  getAllProducts() {
    return axios.get<{ success: boolean; products: ProductI[] }>('https://api.foreverbuy.in/api/product/list');
  }
}

export default new ProductService();
