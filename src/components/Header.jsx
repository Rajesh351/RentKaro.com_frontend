import React from "react";
import { HeartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataUser, setLikeData, setLikeData_id, setPostData, setUser
} from "../redux/userSlice";
import { FaComment } from 'react-icons/fa';
import toast from "react-hot-toast";
import axios from "axios";
import {
  setFilteredPosts, setReceiverId, setSenderId
} from "../redux/messageSlice";
import {USER_API_END_POINT}from "../assets/EndPoint"
const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const { user, postData } = useSelector((state) => state.auth);



  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(false));
        dispatch(setDataUser(null));
        dispatch(setLikeData([]));
        dispatch(setLikeData_id([]));
        dispatch(setReceiverId(null));
        dispatch(setSenderId(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    const searchTerm = search.toLowerCase();
    const filteredProducts = postData.filter((product) =>
      product?.brandName.toLowerCase().includes(searchTerm) ||
      product?.adTitle.toLowerCase().includes(searchTerm) ||
      product?.description.toLowerCase().includes(searchTerm) ||
      product.setPrice.toLowerCase().includes(searchTerm) ||
      product.state.toLowerCase().includes(searchTerm) ||
      product.city.toLowerCase().includes(searchTerm) ||
      product.purchaseYear.toLowerCase().includes(searchTerm)
    );

    dispatch(setFilteredPosts(filteredProducts));
    navigate(`/search/${search}`);
    setSearch("");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
          RentKaro
        </div>

        {/* Search bar (desktop only) */}
        <form
          onSubmit={searchHandler}
          className="hidden sm:flex relative flex-1 mx-4"
        >
          <input
            type="text"
            placeholder="Search for items..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </button>
        </form>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/wishlist")} className="text-gray-600 hover:text-red-500">
            <HeartIcon className="h-6 w-6" />
          </button>

          {user && (
            <button onClick={() => navigate("/Chatlist")} className="text-blue-500 hover:text-blue-700">
              <FaComment size={20} />
            </button>
          )}

          <button
            onClick={() => navigate("/auth")}
            className="relative flex items-center font-semibold text-blue-600 rounded-full shadow-md"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-teal-400 to-blue-500 animate-spin-slow"></div>
            <span className="relative z-10 flex items-center bg-white rounded-full px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              SELL
            </span>
          </button>

          {user ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 py-2">
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="Search for items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
