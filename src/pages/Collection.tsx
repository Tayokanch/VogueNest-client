import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaCaretRight } from 'react-icons/fa';
import Title from '../components/Title';
import { ProductI } from '../services/interface';
import ProductItem from '../components/ProductItem';
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState<Boolean>(false);
  const [filterProducts, setFilterProducts] = useState<ProductI[]>([]);
  const [category, setCategory] = useState<String[]>([]);
  const [subCategory, setSubCategory] = useState<String[]>([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = e.target.value;
    if (category.includes(selectedCategory)) {
      setCategory((prev) =>
        prev.filter((product) => product !== e.target.value)
      );
    } else {
      setCategory((prev) => [...prev, selectedCategory]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSubCategory = e.target.value;
    if (subCategory.includes(selectedSubCategory)) {
      setSubCategory((prev) =>
        prev.filter((product) => product !== e.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, selectedSubCategory]);
    }
  };

  const applyFilter = () => {
    //creating a copy of product
    let productsCopy = products?.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(product=> product.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProductbyPrice = () => {
    let filterProductsCopy = filterProducts.length > 0 ? [...filterProducts] : [];

    switch (sortType) {
      case 'low-high':
        setFilterProducts(
          filterProductsCopy?.sort((a, b) => a.price - b.price)
        );
        break;
      case 'high-low':
        setFilterProducts(
          filterProductsCopy?.sort((a, b) => b.price - a.price)
        );
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    sortProductbyPrice()
  }, [sortType]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  if (products) {
    console.log(products);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 sm:hidden"
        >
          FILTER
          <FaCaretRight className={`h-3 ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* CATEGORIES Filter - Always visible on larger screens (sm and up) */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden sm:block'
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Men"
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Women"
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Kids"
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* TYPE Filter - Toggle on mobile, visible on larger screens */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? '' : 'hidden sm:block' // Show by default on sm screens and above
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Topwear"
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Bottomwear"
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Winterwear"
                onChange={toggleSubCategory}
              />
              Winderwear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select onChange={(e)=> setSortType(e.target.value)} className="border border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: Hight to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts &&
            filterProducts?.map((product, index) => (
              <ProductItem
                key={product._id}
                id={product?._id}
                name={product?.name}
                image={product?.image}
                price={product.price}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
