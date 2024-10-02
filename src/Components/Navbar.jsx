import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { FaCartArrowDown } from "react-icons/fa";


const Navbar = ({ setData, cart }) => {
  // console.log(useLocation());
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  const handlePriceChange = (price) => {
    setSelectedPrices((prevSelectedPrices) => {
      if (prevSelectedPrices.includes(price)) {
        return prevSelectedPrices.filter((p) => p !== price);
      } else {
        return [...prevSelectedPrices, price];
      }
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setData(items);
  };

  const filterItems = () => {
    let filteredItems = items;

    if (selectedCategories.length > 0) {
      filteredItems = filteredItems.filter((item) => selectedCategories.includes(item.category));
    }

    if (selectedPrices.length > 0) {
      filteredItems = filteredItems.filter((item) => selectedPrices.some((price) => item.price >= price));
    }

    return filteredItems;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
    setSearchTerm("")

  }

  useEffect(() => {
    setData(filterItems());
  }, [selectedCategories, selectedPrices]);

  return (
    <>
      <header className='sticky-top'>
        <div className="nav-bar">
          <div className="brand" onClick={() => setData(items)}><Link to={"/"}>E-Cart</Link></div>
          <form onSubmit={handleSubmit} className="search-bar">
            <input type='text'
              placeholder='Search Products'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
          </form>
          <div className="cart"><Link to={"/cart"}>
            <button type="button" className="btn btn-primary position-relative">
              <FaCartArrowDown style={{ fontSize: "1.5rem" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link></div>
        </div>

        {
          location.pathname == "/" && <div className="nav-bar-wrapper">
            <div className="items">Filter by {"->"}</div>
            <div className="items" onClick={resetFilters}>No Filter</div>

            <div className="items">
              <input
                type="checkbox"
                id="mobile"
                checked={selectedCategories.includes('mobiles')}
                onChange={() => handleCategoryChange('mobiles')}
              />
              <label htmlFor="mobile">Mobiles</label>
            </div>

            <div className="items">
              <input
                type="checkbox"
                id="laptops"
                checked={selectedCategories.includes('laptops')}
                onChange={() => handleCategoryChange('laptops')}
              />
              <label htmlFor="laptops">Laptops</label>
            </div>

            <div className="items">
              <input
                type="checkbox"
                id="tablets"
                checked={selectedCategories.includes('tablets')}
                onChange={() => handleCategoryChange('tablets')}
              />
              <label htmlFor="tablets">Tablets</label>
            </div>

            {/* price filter */}

            <div className="items" >
              <input type="checkbox"
                id="29999"
                checked={selectedPrices.includes(29999)}
                onChange={() => handlePriceChange(29999)}
              />
              <label htmlFor="29999">{">="}29,999</label>
            </div>

            <div className="items" >
              <input type="checkbox"
                id="49999"
                checked={selectedPrices.includes(49999)}
                onChange={() => handlePriceChange(49999)}
              />
              <label htmlFor="49999">{">="}49,999</label>
            </div>

            <div className="items" >
              <input type="checkbox"
                id="69999"
                checked={selectedPrices.includes(69999)}
                onChange={() => handlePriceChange(69999)}
              />
              <label htmlFor="69999">{">="}69,999</label>
            </div>

            <div className="items" >
              <input type="checkbox"
                id="89999"
                checked={selectedPrices.includes(89999)}
                onChange={() => handlePriceChange(89999)}
              />
              <label htmlFor="89999">{">="}89,999</label>
            </div>
          </div>
        }


      </header>
    </>
  );
};

export default Navbar;
