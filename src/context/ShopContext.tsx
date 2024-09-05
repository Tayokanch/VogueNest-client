import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ProductI } from '../services/interface';
import productService from '../services/product.service';

interface ShopContextType {
  products: ProductI[];
  setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
  currency: string;
  delivery_fee: number;
  search: String;
  setSearch: React.Dispatch<React.SetStateAction<String>>;
  showSearch: Boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<Boolean>>;

}

export const ShopContext = createContext<ShopContextType>();

type Props = {
  children: ReactNode;
};

const ShopContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [search, setSearch] = useState<string>(''); 
  const [showSearch, setShowSearch] = useState<Boolean>(false);

  const currency: string = '£';
  const delivery_fee: number = 10;

  const value = {
    products,
    setProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
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

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
