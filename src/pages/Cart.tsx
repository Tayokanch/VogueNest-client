import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { FaTrash } from 'react-icons/fa';
import CartTotal from '../components/CartTotal';
import { CartProductsI, OrderedProducts } from '../services/interface';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    deleteItem,
    navigate,
    order,
    setOrder,
    loginUSer,
    cartProducts,
    setCartProducts,
  } = useContext(ShopContext);

  useEffect(() => {
    const tempProducts: CartProductsI[] = [];
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
    setCartProducts(tempProducts);
  }, [cartItems]);

  useEffect(() => {
    const newOrder: OrderedProducts[] = cartProducts
      .map((cartProduct) => {
        const product = products?.find((p) => p._id === cartProduct._id);
        if (product) {
          return {
            name: product.name,
            image: product.image,
            size: cartProduct.size,
            currency: '£',
            quantity: cartProduct.quantity,
            price: product.price,
            productId: product._id,
          };
        }
        return null;
      })
      .filter(Boolean) as OrderedProducts[];

    localStorage.setItem('orders', JSON.stringify(newOrder));
    const getCustomerOrders = localStorage.getItem('orders');
    if (getCustomerOrders) {
      setOrder(JSON.parse(getCustomerOrders));
    }
  }, [cartProducts, products]);

  const handleCheckout = () => {
    if (order.length === 0) {
      toast('Your Cart is empty');
    }
    else if(loginUSer) {
      navigate('/place-order');
    } else {
      toast('Kindly login to checkout');
      navigate('/login');
    }
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  useEffect(() => {
    console.log('This is LoggedIn User', loginUSer);
  }, []);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartProducts.map((cartProduct, index) => {
          const product = products?.find((p) => p._id === cartProduct._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={product?.image[0]} alt="" className="w-16 sm:w-20" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {product?.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {product?.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {cartProduct.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.validationMessage === '0'
                    ? null
                    : updateQuantity(
                        product?._id!,
                        cartProduct.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={cartProduct.quantity}
              />
              <FaTrash
                onClick={() => {
                  deleteItem(product?._id!, cartProduct.size); // Call deleteItem to ensure state updates
                }}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleCheckout}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
