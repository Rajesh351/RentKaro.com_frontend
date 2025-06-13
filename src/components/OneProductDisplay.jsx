import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { setSenderId, setReceiverId } from "../redux/messageSlice";
import { useDispatch } from "react-redux";

const OneProductDisplay = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { postData, user,userData } = useSelector((state) => state.auth);
const navigate=useNavigate();
const handlerSubmit=()=>{
  if(userData._id !== product?.userId._id) {
     dispatch(setSenderId(userData._id));
     dispatch(setReceiverId(product.userId._id));
  }
  
   navigate(`/userChat/${product?.userId._id}`);
  
}
  const product = postData?.find((p) => p._id === productId);
  if (!product) {
    return (
      <div className="p-8 text-center text-red-600 text-xl font-semibold">
        Product not found!
      </div>
    );
  }

  return (
    <div className="w-full h-full pt-[100px] pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">

        {/* Product Image */}
        {product?.image && (
          <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Badge and Title */}
        <div className="space-y-2">
          <span className="inline-block bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded">
            FEATURED
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {product?.adTitle || "Product Title"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {product?.category || "Category"}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm pt-2">
            <span>₹ {product?.setPrice}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">👤</span>
              <span><strong>Owner:</strong> {product?.userId.name || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📍</span>
              <span><strong>Location:</strong> {product?.state} {product.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <span><strong>Posting Date:</strong>{product.purchaseYear}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">Description</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product?.description || "No description available."}
          </p>
        </div>

        {/* Chat Button */}
        {user&& product?.userId && userData._id !== product.userId._id && (
          <div className="pt-4 flex justify-center">
            <button onClick={handlerSubmit} className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold px-6 py-2 rounded-lg shadow">
              Chat with Client
            </button>
          </div>
        )}



      </div>
    </div>
  );
};

export default OneProductDisplay;
