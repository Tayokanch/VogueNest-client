import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import productService from '../services/product.service';
import Title from './Title';
import { ProductI } from '../services/interface';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const context = useContext(ShopContext);
  const { products, setProducts, currency, delivery_fee } = context;
  const [latestProducts, setLatestProducts] = useState<ProductI[]>([]);

  const FetchProducts = async () => {
    const { getAllProducts } = productService;

    try {
      const res = await getAllProducts();
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  if (products) {
    console.log('this is products', products);
  }
  if (latestProducts) {
    console.log('this is latestProducts', latestProducts);
  }
  useEffect(() => {
    FetchProducts();
  }, []);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
          fuga reprehenderit neque dolore eum provident laudantium illum maiores
          atque repudiandae tempora et, quia perspiciatis eaque sint similique
          explicabo! Hic, eligendi?
        </p>
      </div>
      {/* Rendering 10 Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts &&
          latestProducts.map((latestProduct, index) => (
            <ProductItem
              key={latestProduct._id}
              id={latestProduct._id}
              name={latestProduct.name}
              image={latestProduct.image}
              price={latestProduct.price}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestCollection;
