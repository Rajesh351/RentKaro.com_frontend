import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { likeData, user,postData} = useSelector((state) => state.auth);
   const navigate=useNavigate();
  // Filter products that are liked
  useEffect(()=>{
    if(!user)  navigate("/auth")
  },[user,navigate])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Wishlisted Products</h1>

      {likeData?.length === 0 ? (
        <p className="text-gray-500">You have no products in your wishlist.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {likeData?.map((product) => (
            <ProductCard key={product?.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
