import React from 'react';
import { NavLink } from 'react-router-dom';
import successImage from '../../assets/success.png'
const Success = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-5xl font-bold">Payment Successful</h2>
          <p className="text-3xl">Thank you for choosing VogueNest.</p>
          <NavLink
            to={'/'}
            className="bg-black w-[200px] text-white py-2 px-5 text-center border border-orange-500 rounded-2xl hover:bg-slate-700 hover:transition-all"
          >
            Back Home
          </NavLink>
        </div>
        <div>
          <img src={successImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Success;
