import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import productService from '../services/product.service';
import Title from './Title';
import { ProductI } from '../services/interface';
import ProductItem from './ProductItem';
import SkeletonLoader from './SkeletonLoader';
const LatestCollection = () => {
  const context = useContext(ShopContext);
  const { products, setProducts } = context;
  const [latestProducts, setLatestProducts] = useState<ProductI[]>([]);
  const numberOfSkeletons = 10;

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
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-/4 m-auto text-xs sm:text-sm md:text-gray-600">
          Step into the world of VogueNest, where fashion meets individuality.
          Our latest collections are more than just clothes, they're an
          extension of your personality, crafted to empower and inspire.
        </p>
      </div>
      {/* Rendering 10 Products */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length === 0
          ? Array.from({ length: numberOfSkeletons }, (_, index) => (
              <SkeletonLoader key={index} />
            ))
          : latestProducts.map((latestProduct) => (
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
