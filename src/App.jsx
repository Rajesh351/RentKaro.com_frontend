import React from "react";
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OneProductDisplay from "./components/OneProductDisplay.jsx";
import PostYourAd from "./components/Post.jsx";
import PostYourAdForm from "./components/PostaddFrom.jsx";
import WishList from "./components/WishList.jsx";
import { useSelector } from "react-redux";
import Footer from "./components/Footer.jsx";
import useProductData from "./hooks/useProductdata.js";
import Chat from "./chat/Chat.jsx";
import {io} from "socket.io-client";
import { useEffect,useMemo } from "react";
import Chatlist from "./chat/userList.jsx";
import Search from "./chat/Search.jsx";
function App() {
          useProductData();
  const { userData} = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="w-full h-full">
        <Header />
        <main className="w-full h-full ml-[60px] mr-[60px]  pr-[50px] mt-2">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:productId" element={<OneProductDisplay />} />

            <Route path="/auth" element={<PostYourAd />} />
            <Route path="/category" element={<PostYourAdForm />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/userChat/:receiverId" element={<Chat/>} />
            <Route path="/Chatlist" element={<Chatlist />} />
            <Route path="/search/:query" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
