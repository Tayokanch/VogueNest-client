import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-black">
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">{'Login'}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email'  required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password'  required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <Link to = '/sign-up'>Create account</Link>
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>Sign Up</button>
    </form>
  );
};

export default Login;
