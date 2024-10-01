import React, { createContext, useState, ReactNode, useEffect } from 'react';
import {
  CartItems,
  CartProductsI,
  defaultShopContext,
  LoggedUserI,
  OrderedProducts,
  ProductI,
  ShopContextType,
} from '../services/interface';
import productService from '../services/product.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import VogueNestService from '../services/api-client';

import axios, { AxiosError } from 'axios';

export const ShopContext = createContext<ShopContextType>(defaultShopContext);

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
  const [loginUSer, setLoginUser] = useState<LoggedUserI>({
    login: false,
    role: '',
    id: '',
  });
  const [cartProducts, setCartProducts] = useState<CartProductsI[]>([]);

  const navigate = useNavigate();

  const currency: string = '£';
  const delivery_fee: number = 10;

  const FetchProducts = async () => {
    const { getAllProducts } = productService;

    try {
      const res = await getAllProducts();
      setProducts(res.data.products as ProductI[]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);

  useEffect(() => {
    const validateCookie = async () => {
      try {
        const response: any = await VogueNestService.validateCookie();
        if (!response.ok) {
          navigate('/login');
          return;
        }
        setLoginStatus(response.login);
        setLoginUser(response);
      } catch (err) {
        console.error(err);
      }
    };

    validateCookie();
  }, []);

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
    return totalAmount;
  };
  useEffect(() => {
    const getCustomerOrders = localStorage.getItem('orders');
    if (getCustomerOrders) {
      setOrder(JSON.parse(getCustomerOrders));
    }
  }, [cartProducts, products]);

  const postOrderToDB = async (): Promise<boolean> => {
    setLoading(true);
    try {
       await axios.post(
        'https://voguenest-server.onrender.com/api/voguenest/send-orders',
        {
          orders: order.map((item) => ({
            size: item.size,
            quantity: item.quantity,
            productId: item.productId,
          })),
        },
        {
          withCredentials: true,
        }
      );

      return true;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        const errorMessage =
          axiosError.response.data.message || axiosError.response.data.error;
        console.error('Error posting order to DB:', {
          status: statusCode,
          message: errorMessage,
        });
        toast(errorMessage);
        navigate('/login');
      }
      setLoading(false);
      return false;
    }
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
        setLoginUser,
        cartProducts,
        setCartProducts,
        postOrderToDB,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
