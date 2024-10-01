import { NavigateFunction } from 'react-router-dom';

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

interface SizeQuantities {
  [size: string]: number;
}

export interface Order {
  _id: string;
  customerId: string;
  orders: ProductOrder[];
  deliveryStatus: string;
  createdAt: string;
  __v: number;
}
export interface ProductOrder {
  productId: string;
  size: string;
  quantity: number;
  _id: string;
}

export type CartItems = Record<string, SizeQuantities>;

export interface ShopContextType {
  products: ProductI[];
  setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  loginUSer: LoggedUserI;
  setLoginUser: React.Dispatch<React.SetStateAction<LoggedUserI>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (productId: string, size: string) => Promise<void>;
  cartItems: CartItems;
  getCartCount: () => number;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  deleteItem: (productId: string, size: string) => void;
  getCartAmount: () => number;
  navigate: NavigateFunction;
  loginStatus: boolean;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
  order: OrderedProducts[];
  setOrder: React.Dispatch<React.SetStateAction<OrderedProducts[]>>;
  loading: Boolean;
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>;
  cartProducts: CartProductsI[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProductsI[]>>;
  postOrderToDB: () => {};
}

export const defaultShopContext: ShopContextType = {
  products: [],
  setProducts: () => {},
  currency: '£',
  delivery_fee: 10,
  search: '',
  setSearch: () => {},
  loginUSer: {} as LoggedUserI,
  setLoginUser: () => {},
  showSearch: false,
  setShowSearch: () => {},
  addToCart: async () => Promise.resolve(),
  cartItems: {},
  getCartCount: () => 0,
  updateQuantity: () => {},
  deleteItem: () => {},
  getCartAmount: () => 0,
  navigate: {} as NavigateFunction, // Placeholder for navigation
  loginStatus: false,
  setLoginStatus: () => {},
  order: [],
  setOrder: () => {},
  loading: false,
  setLoading: () => {},
  cartProducts: [],
  setCartProducts: () => {},
  postOrderToDB: async () => Promise.resolve(),
};
