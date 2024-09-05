import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaTimes } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
    const [visible, setVisible] = useState<Boolean>(false)
    const location = useLocation();

        useEffect(()=>{
            if(location.pathname.includes('/collection')){
                setVisible(true)
            }
            else{
                setVisible(false)
            }
        },[location])
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <FontAwesomeIcon icon={faSearch} className="w-4" />
      </div>
      <MdClose
        color="gray"
        onClick={() => setShowSearch(false)}
        className="inline w-6 cursor-pointer hover:rotate-90 hover:scale-110 transition-transform duration-300"
      />
    </div>
  ) : null;
};

export default SearchBar;
