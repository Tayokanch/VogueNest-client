import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ProductI } from '../services/interface';
import Title from './Title';
import ProductItem from './ProductItem';
interface Props {
  category: string;
  subCategory: string;
}
const RelatedProducts = ({ category, subCategory }: Props) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState<ProductI[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (product) => product.category === category
      );
      productsCopy = productsCopy.filter(
        (product) => product.subCategory === subCategory
      );

      setRelated(productsCopy);
      setRelated(productsCopy?.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24 ">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className="grid grid-cols-2m sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related &&
          related.map((product) => (
            <ProductItem
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
