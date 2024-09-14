import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import VogueNestService from '../services/api-client';

interface ProductOrder {
  productId: string;
  size: string;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  customerId: string;
  orders: ProductOrder[];
  deliveryStatus: string;
  createdAt: string;
  __v: number;
}

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  const [myOrder, setMyOrder] = useState<Order[]>([]);

  const getMyOrder = async () => {
    try {
      const order: Order[] = await VogueNestService.getUserOrder();
      setMyOrder(order);
      if (order) {
        console.log(order);
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          myOrder?.map((item) => (
            item.orders.map((order) => {
              const product = products.find((prod) => prod._id === order.productId);
              if (product) {
                return (
                  <div
                    key={product._id}
                    className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-6 text-sm">
                      <img src={product.image[0]} alt="" className="w-16 sm:w-20" />

                      <div>
                        <p className="sm:text-base font-medium">{product.name}</p>
                        <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                          <p className="text-lg">
                            {currency}
                            {product.price}
                          </p>
                          <p>{`Quantity: ${order.quantity}`}</p>
                          <p>{`Size: ${order.size}`}</p>
                        </div>
                        <p className="mt-2">
                          Date: <span className="text-gray-400"> 25, sep, 2024</span>
                        </p>
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                      <div className='flex items-center gap-2'>
                        <p className='min-w-2 h-2 rounded-full bg-orange-500'></p>
                        <p className='text-sm md:text-base'>Ready to ship</p>
                      </div>
                      <button className='border px-4 py-2 text-sm font-medium round-full'>Track Order</button>
                    </div>
                  </div>
                );
              }
              return null; 
            })
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
