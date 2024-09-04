import React, { createContext, useState, ReactNode } from "react";
import { ProductI } from "../services/interface";

interface ShopContextType {
    products: ProductI[];
    setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
    currency: string;
    delivery_fee: number;
}

export const ShopContext = createContext<ShopContextType >();

type Props = {
    children: ReactNode;
};

const ShopContextProvider: React.FC<Props> = ({ children }) => {
    const [products, setProducts] = useState<ProductI[]>([]);
    const currency: string = '£';
    const delivery_fee: number = 10;

    const value = {
        products,
        setProducts,
        currency,
        delivery_fee
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
