import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useProductData from "../hooks/useProductdata";
import { setDataUser, setPostData } from "../redux/userSlice";
import {POST_API_END_POINT} from "../assets/EndPoint"
import { setFilteredPosts } from "../redux/messageSlice";
const PostForm = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [input, setInput] = useState({
    brandName: "",
    purchaseYear: "",
    adTitle: "",
    description: "",
    setPrice: "",
    state: "",
    city: "",
    mobileNo: "",
    file: null,
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brandName", input?.brandName);
    formData.append("purchaseYear", input?.purchaseYear);
    formData.append("adTitle", input?.adTitle);
    formData.append("description", input?.description);
    formData.append("setPrice", input?.setPrice);
    formData.append("state", input?.state);
    formData.append("city", input?.city);
    formData.append("mobileNo", input?.mobileNo);
    if (input?.file) {
      formData.append("image", input?.file);
    }
    let res;
    try {
      res = await axios.post(`${POST_API_END_POINT}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Post Created Successfully");
      dispatch(setPostData(res?.data?.allPosts))
      dispatch(setFilteredPosts(res?.data?.allPosts))
      navigate("/");

    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto mt-10 p-6   bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>

      {[
        { name: "brandName", label: "Brand Name" },
        { name: "purchaseYear", label: "Purchase Year" },
        { name: "adTitle", label: "Ad Title" },
        { name: "description", label: "Description" },
        { name: "setPrice", label: "Set Price" },
        { name: "state", label: "State" },
        { name: "city", label: "City" },
        { name: "mobileNo", label: "Mobile Number" },
      ].map((field) => (
        <div className="mb-4" key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={input[field.name]}
            onChange={changeHandler}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      ))}

      <div className="mb-6">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image (JPG, PNG)
        </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          onChange={fileChangeHandler}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
