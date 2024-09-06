import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ProductI } from '../services/interface';
import Title from './Title';
import ProductItem from './ProductItem';
import SkeletonLoader from './SkeletonLoader';
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState<ProductI[]>([]);
  const numberOfSkeletons = 6;
  useEffect(() => {
    const bestProducts = products?.filter((product) => product.bestseller);
    setBestSellers(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'Best'} text2={'SELLERS'}></Title>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dicta
          dolor ea minus a dolore iusto iure sequi dignissimos non? Id rem
          eveniet nam asperiores harum neque facilis iure facere.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.length === 0
          ? Array.from({ length: numberOfSkeletons }, (_, index) => (
              <SkeletonLoader key={index} />
            ))
          : bestSellers.map((bestSeller) => (
              <ProductItem
                key={bestSeller._id}
                id={bestSeller._id}
                name={bestSeller.name}
                image={bestSeller.image}
                price={bestSeller.price}
              />
            ))}
      </div>
    </div>
  );
};

export default BestSeller;
