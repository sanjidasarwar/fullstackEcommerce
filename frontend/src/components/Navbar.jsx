// import React from "react";
import { useContext, useState } from "react";
import { FaAngleDoubleLeft, FaShoppingBag } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { logo } from "../assets";
import { ShopContext } from "../context/shopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, token, handleToken, navigate, handleCartItem } =
    useContext(ShopContext);

  const handleLogout = () => {
    navigate("/login");
    handleToken("");
    localStorage.removeItem("token");
    handleCartItem({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={logo} className="w-36" alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <IoSearchOutline className="" />

        <div className="relative group">
          <FiUser className="cursor-pointer" />
          <div className="dropdown-menu group-hover:block hidden absolute left-0 pt-4 z-50">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded shadow-md">
              {token && (
                <>
                  <p className="font-normal hover:font-bold hover:text-black cursor-pointer">
                    My Profile
                  </p>
                  <p className="font-normal hover:font-bold hover:text-black cursor-pointer">
                    Orders
                  </p>
                </>
              )}
              <p
                className="font-normal hover:font-bold hover:text-black cursor-pointer"
                onClick={() => (token ? handleLogout() : navigate("/login"))}
              >
                {token ? "Logout" : "Login"}
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <FaShoppingBag />
          <p className="absolute left-2 top-2 w-4 text-center leading-4 bg-rose-700 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <div onClick={() => setVisible(true)}>
          <RxHamburgerMenu className="cursore-pointer sm:hidden" />
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`absolute top-0 left-0 bottom-0 overflow-hidden z-20 bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <FaAngleDoubleLeft />
            Back
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="py-2 pl-6 border"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="py-2 pl-6 border"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="py-2 pl-6 border"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="py-2 pl-6 border"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
