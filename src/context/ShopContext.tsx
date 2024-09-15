import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { OrderedProducts, ProductI } from '../services/interface';
import productService from '../services/product.service';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import VogueNestService from '../services/api-client'

interface ShopContextType {
  products: ProductI[];
  setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  loginUSer: string
  setLoginUser: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (productId: string, size: string) => Promise<void>;
  cartItems: CartItems;
  getCartCount: () => number;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  deleteItem: (productId: string, size: string) => void; // Method to delete items
  getCartAmount: () => number;
  navigate: NavigateFunction;
  loginStatus: boolean;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
  order: OrderedProducts[]
  setOrder: React.Dispatch<React.SetStateAction<OrderedProducts[]>>; 
  loading: Boolean
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>; 

}

interface SizeQuantities {
  [size: string]: number;
}

export type CartItems = Record<string, SizeQuantities>;
export const ShopContext = createContext<ShopContextType>();

type Props = {
  children: ReactNode;
};

const ShopContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderedProducts[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [loginUSer, setLoginUser] = useState<string>('');


  const navigate = useNavigate();

  const currency: string = '£';
  const delivery_fee: number = 10;

  const FetchProducts = async () => {
    const { getAllProducts } = productService;

    try {
      const res = await getAllProducts();
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  useEffect(()=>{
    const validateCookie = async ()=>{
      const response: any = await VogueNestService.validateCookie()
      console.log(response)
      setLoginStatus(response.data)
      setLoginUser(response.role)
    }

    validateCookie()
  },[])

  // Load cart items from localStorage
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (productId: string, size: string) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }
    let cartItemsCopy = structuredClone(cartItems);
    if (cartItemsCopy[productId]) {
      if (cartItemsCopy[productId][size]) {
        cartItemsCopy[productId][size] += 1;
      } else {
        cartItemsCopy[productId][size] = 1;
      }
    } else {
      cartItemsCopy[productId] = {};
      cartItemsCopy[productId][size] = 1;
    }

    setCartItems(cartItemsCopy);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    let cartData = structuredClone(cartItems);

    // Update quantity or remove item if quantity is 0
    if (quantity <= 0) {
      delete cartData[productId][size]; // Remove size entry
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId]; // Remove product entry if no sizes left
      }
    } else {
      cartData[productId][size] = quantity; // Update quantity
    }

    setCartItems(cartData);
  };

  const deleteItem = (productId: string, size: string) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      delete cartData[productId][size]; // Remove size entry
      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId]; // Remove product entry if no sizes left
      }
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const product = products.find((p) => p._id === productId);
        if (product) {
          totalAmount += product.price * cartItems[productId][size];
        }
      }
    }
    return totalAmount ;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        getCartCount,
        updateQuantity,
        deleteItem,
        getCartAmount,
        navigate,
        loginStatus,
        setLoginStatus,
        order,
        setOrder,
        loading, 
        setLoading,
        loginUSer,
         setLoginUser
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
