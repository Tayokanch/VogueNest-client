import { useContext } from 'react';
import { ProductItemI } from '../services/interface';
import { ProductContext } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }: ProductItemI) => {
  const { currency } = useContext(ProductContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer ">
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
