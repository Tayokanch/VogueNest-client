export interface ProductI {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
  date: number;
  __v: number;
}
export interface CartProductsI {
  _id: string;
  size: string;
  quantity: number;
}

export interface ProductItemI {
  id: string;
  image: string[];
  name: string;
  price: number;
}

export interface FormData {
  name: string;
  password: string;
  email: string;
}
export interface OrderedProducts {
  currency: string;
  name: string;
  image: string[];
  price: number;
  size: string;
  quantity: number;
  productId: string;
}
export interface LoggedUserI {
  login: Boolean;
  role: String;
  id: String;
}
export interface LoginData extends Omit<FormData, 'name'> {}
