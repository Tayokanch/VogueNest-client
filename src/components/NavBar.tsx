import { assests } from '../assets/assets.ts';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FaCartPlus } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa'; // Close window icon
import { ShopContext } from '../context/ShopContext.tsx';
import { useLocation } from 'react-router-dom';
const NavBar = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const { setShowSearch,getCartCount } = useContext(ShopContext);
  const [searchIcon, setSearchIcon] = useState<Boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/collection') {
      setSearchIcon(false);
    } else {
      setSearchIcon(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={'/'}>
        <img src={assests.vogueLogo} alt="Logo" className="w-36 aspect-2/0.9" />
      </Link>
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
        <FontAwesomeIcon
          onClick={() => setShowSearch(true)}
          icon={faSearch}
          className={`w-5 cursor-pointer ${searchIcon ? 'block' : 'hidden'}`}
        />
        <div className="group relative">
          <FontAwesomeIcon icon={faUser} className="w-5 cursor-pointer" />
          <div className="group-hover:block  absolute dropdown-menu right-0 pt-4 hidden">
            <div className="flex flex-col gat-2 w-44 py-3 px-3 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black text-center border">
                My Profile
              </p>
              <p className="cursor-pointer hover:text-black text-center border">
                Orders
              </p>
              <p className="cursor-pointer hover:text-black text-center border">
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to={'/cart'} className="relative">
          <FaCartPlus className="w-5 min-w-5" />
          <p className="absolute right-[-10px] bottom-[-5px] w-4 text-center leading-4 bg-orange-500 text-black aspect-square rounded-full text-[8px] ">
            {getCartCount()}
         
          </p>
        </Link>
        <FaBars
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/*Sidebar menu for small Screen   */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <FaWindowClose className="h-full rotate-180 hover:cursor-pointer text-black" />
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={'/'}
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={'/collection'}
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={'/about'}
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={'/contact'}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
