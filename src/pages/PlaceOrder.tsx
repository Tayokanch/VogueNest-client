import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import striplogo from '../assets/stripe.png';
import { ShopContext } from '../context/ShopContext';
import { loadStripe } from '@stripe/stripe-js';
import LoadingBar from '../components/LoadingBar';
import { toast } from 'react-toastify';
const PlaceOrder = () => {
  const [method, setMethod] = useState<string>('');
  const { order, navigate, loading, setLoading, loginUSer } =
    useContext(ShopContext);
  const [displayToast, setDisplayToast] = useState<Boolean>(false);

  const makePayment = async () => {
    const stripe = await loadStripe(
      'pk_test_51Pwfos01Lv2goK4hMf9Uvu0YddgMCJO04qKvF63x5nv4p1HJFxvDeaAnmaGO0JT9vUo8aHOAO0uDalTHfkWVd00Z00fBfOel83'
    );
    setLoading(true);
    const body = {
      products: order,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const notify = (message: string) => toast(message);

    try {
      const response = await fetch(
        'http://localhost:8050/api/payment/create-checkout-session',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        if (errorData.message) {
          notify(errorData.message);
        }
        if (response.status === 404) {
          navigate('/login');
        }
        throw new Error('Network response was not ok');
      }

      const session = await response.json();
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      setLoading(false);

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  useEffect(() => {
    console.log('This is LoggedIn User', loginUSer);
  }, []);

  useEffect(() => {
    console.log('This is order', order);
  }, []);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            required
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          />
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Post Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-8">
          <CartTotal />
        </div>

        <div className="mt-12" onClick={() => setMethod('stripe')}>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'stripe' ? 'bg-orange-500' : ''
                }`}
              ></p>
              <img
                className="w-20 aspect-[2/1] object-cover"
                src={striplogo}
                alt=""
              />
            </div>
          </div>

          <div className="w-full text-end mt-8">
            {loading ? (
              <LoadingBar />
            ) : (
              <button
                onClick={makePayment}
                className="bg-black text-white  px-16 py-3 text-sm cursor-pointer hover:bg-slate-600"
              >
                PLACE ORDER
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
