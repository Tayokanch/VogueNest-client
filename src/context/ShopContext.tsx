import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ProductI } from '../services/interface';
import productService from '../services/product.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router-dom';
import VogueNestService from '../services/api-client';

interface ShopContextType {
  products: ProductI[];
  setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<String>>;
  showSearch: Boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<Boolean>>;
  addToCart: (productId: string, size: string) => Promise<void>;
  cartItems: CartItems;
  getCartCount: () => number;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: NavigateFunction;
  loginStatus: boolean;
  setLoginStatus: React.Dispatch<React.SetStateAction<Boolean>>;
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
  const [showSearch, setShowSearch] = useState<Boolean>(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [loginStatus, setLoginStatus] = useState<Boolean>(false);

  const navigate = useNavigate();

  const currency: string = '£';
  const delivery_fee: number = 10;

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
    for (const products in cartItems) {
      for (const size in cartItems[products]) {
        try {
          if (cartItems[products][size] > 0) {
            totalCount += cartItems[products][size];
          }
        } catch (err) {}
      }
    }

    return totalCount;
  };

  const updateQuantity = async (
    productId: string,
    size: string,
    quantity: number
  ) => {
    let cartData = structuredClone(cartItems);
    cartData[productId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      for (const sizeQuantity in cartItems[itemId]) {
        try {
          if (cartItems[itemId][sizeQuantity] > 0) {
            totalAmount += itemInfo?.price * cartItems[itemId][sizeQuantity];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmount;
  };

  const value = {
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
    getCartAmount,
    navigate,
    loginStatus,
    setLoginStatus,
  };

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

  useEffect(() => {
    console.log(cartItems, 'This is CartItems');
    console.log(loginStatus, 'This is loginStatus');
  }, [cartItems, loginStatus]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await VogueNestService.validateCookie();
        if (res) {
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
        }
      } catch (error) {
        console.log(error);
        setLoginStatus(false);
        navigate('/login');
      }
    };

    checkLoginStatus();
  }, []);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
