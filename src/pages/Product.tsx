import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ProductI } from '../services/interface';
import star from '../assets/star.png';
import dullstar from '../assets/dullstar.png';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [selectSize, setSelectSize] = useState('');
  const [productData, setProductData] = useState<ProductI>();
  const [image1, setImage1] = useState<string>('');
  const FetchProductData = async () => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      setProductData(product);
      setImage1(product.image[0]);
      return;
    }
  };

  useEffect(() => {
    FetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData &&
              productData.image.map((image, index) => (
                <img
                  onClick={() => setImage1(image)}
                  src={image}
                  key={index}
                  alt=""
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image1} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={star} alt="" className="w-3 5" />
            <img src={star} alt="" className="w-3 5" />
            <img src={star} alt="" className="w-3 5" />
            <img src={star} alt="" className="w-3 5" />
            <img src={dullstar} alt="" className="w-3 5" />
            <p className="pl-2">(141)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{`${currency}${productData.price}`}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData &&
                productData.sizes.map((size, index) => (
                  <button
                    onClick={() => setSelectSize(size)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      size === selectSize ? 'border-orange-500' : ''
                    }`}
                    key={index}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, selectSize)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is availablke on this product</p>
            <p>Eazy return and exchnage policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Review(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Product */}
      <RelatedProducts category={ productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
