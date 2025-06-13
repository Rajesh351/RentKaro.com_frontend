import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setLikeData, setLikeData_id } from "../redux/userSlice"; // Adjust path as needed
import axios from "axios"; // Make sure axios is installed
import { useEffect } from "react";
import toast from "react-hot-toast";
import {USER_API_END_POINT} from '../assets/EndPoint'

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, likeData, likeData_id } = useSelector((state) => state.auth);
  const likeSet = new Set(likeData_id);
  let isLiked = likeSet?.has(product?._id)
  if (user) {
    isLiked = likeSet?.has(product?._id);
  }
  // Ensure no duplicates
  const handleFavoriteClick = async (event) => {
    event.stopPropagation(); // Prevent card click

    if (!user) {
      navigate("/auth");
      return;
    }
    try {
      // Call the backend API to toggle like/dislike
      const res = await axios.post(
        `${USER_API_END_POINT}/likeordislike`, // Adjust to your backend route
        { productId: product?._id }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      dispatch(setLikeData(res?.data?.likedProducts))
      dispatch(setLikeData_id(res?.data?.likedProducts?.map(p => p?._id)));
    } catch (err) {
       toast.error("Failed to update like status!");
    }
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 cursor-pointer"
      onClick={() => navigate(`/product/${product?._id}`)}
    >
      {/* Heart Icon */}
      <div
        className="absolute top-6 right-6 z-10"
        onClick={handleFavoriteClick}
      >
        {isLiked ? (
          <AiFillHeart className="h-6 w-6 text-red-500 drop-shadow-md" />
        ) : (
          <AiOutlineHeart className="h-6 w-6 text-gray-400 drop-shadow-md" />
        )}
      </div>

      {/* Product Image */}
      <img
        src={product?.image}
        alt={product?.adTitle}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* Product Info */}
      <p className="text-blue-600 font-bold mt-2">₹{product?.setPrice}</p>
      <h2 className="text-lg font-semibold text-gray-800 mt-2">
        {product?.adTitle}
      </h2>

     


      <div className="text-xs text-gray-400 mt-1">
        {product?.city}, {product?.state}
      </div>
    </div>
  );
};

export default ProductCard;
