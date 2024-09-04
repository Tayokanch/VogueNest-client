import { assests } from '../assets/assets.ts';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FaCartPlus } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

const NavBar = () => {
    const [visible, setVisible] = useState(false)
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={assests.vogueLogo} alt="Logo" className="w-36 aspect-2/0.9" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to={'/'}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink
          className="flex flex-col items-center gap-1"
          to={'/collection'}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={'/about'}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={'/contact'}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <FontAwesomeIcon icon={faSearch} className="w-5 cursor-pointer" />
        <div className="group relative">
          <FontAwesomeIcon icon={faUser} className="w-5 cursor-pointer" />
          <div className="group-hover:block  absolute dropdown-menu right-0 pt-4 hidden">
            <div className="flex flex-col gat-2 w-36 py-3 px-3 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to={'/cart'} className="relative">
          <FaCartPlus className="w-5 min-w-5" />
          <p className="absolute right-[-10px] bottom-[-5px] w-4 text-center leading-4 bg-orange-600 text-black aspect-square rounded-full text-[8px] ">
            0
          </p>
        </Link>
        <FaBars onClick={()=> setVisible(true)} className='w-5 cursor-pointer sm:hidden'/>
      </div>
      {/*  */}
    </div>
  );
};

export default NavBar;
