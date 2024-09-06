import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ProductI } from '../services/interface';
import productService from '../services/product.service';
import { toast } from 'react-toastify';

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
}

interface SizeQuantities {
  [size: string]: number;
}

type CartItems = Record<string, SizeQuantities>;

export const ShopContext = createContext<ShopContextType>();

type Props = {
  children: ReactNode;
};

const ShopContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<Boolean>(false);
  const [cartItems, setCartItems] = useState<CartItems>({});

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
    console.log(cartItems);
  }, [cartItems]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
