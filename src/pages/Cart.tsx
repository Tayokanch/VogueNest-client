import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { FaTrash } from 'react-icons/fa'; 


interface CartProductsI {
  _id: string;
  size: string;
  quantity: number;
}
const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);

  const [cartProducts, setCartProducts] = useState<CartProductsI[]>([]);
  useEffect(() => {
    const tempProducts = [];
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          tempProducts.push({
            _id: items,
            size: size,
            quantity: cartItems[items][size],
          });
        }
      }
    }
    console.log(tempProducts);
    setCartProducts(tempProducts);
  }, [cartItems]);
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div >
        {cartProducts &&
          cartProducts.map((cartProduct, index) => {
            const product = products?.find((p) => p._id === cartProduct._id);
            const size =product?.sizes.find((size)=> size === cartProduct.size)
return (
  <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
    <div className='flex items-start gap-6 '>
      <img src={product?.image[0]} alt="" className='w-16 sm:w-20' />
      <div>
        <p className='text-xs sm:text-lg font-medium'>{product?.name}</p>
        <div className='flex items-center gap-5 mt-2'>
          <p>{currency}{product?.price}</p>
          <p className='px-2 sm-px-3 sm:py-1 border bg-slate-50'>{size}</p>
        </div>
      </div>
    </div>
    <input  onChange={(e)=>e.target.value === '' || e.target.validationMessage === '0' ? null : updateQuantity(product?._id, size, Number(e.target.value) )} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={cartProduct.quantity}/>
    <FaTrash onClick={()=>updateQuantity(product?._id, size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer'/>
  </div>
)
            
          })}
      </div>
    </div>
  );
};

export default Cart;
