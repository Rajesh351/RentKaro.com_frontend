import React from 'react'
import ProductCard from '../components/ProductCard.jsx';
import { useSelector } from 'react-redux';

 const Search = () => {
    const{filteredPosts} = useSelector((state) => state.message);
  return (
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  pb-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h1>
      
      {filteredPosts?.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPosts?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search;
