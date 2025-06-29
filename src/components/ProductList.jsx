import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { postData,user } = useSelector((state) => state.auth);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-10 pt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h1>
      
      {postData?.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {postData?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
