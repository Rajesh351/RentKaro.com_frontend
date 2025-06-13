import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { categories } from '../assets/Item';
import { useDispatch, useSelector } from 'react-redux';
import { setDataUser, setLikeData, setLikeData_id, setUser } from '../redux/userSlice';
import { setAllreceivermessagesID, setReceiverId, setSenderId } from '../redux/messageSlice';
import {USER_API_END_POINT} from "../assets/EndPoint"
const PostYourAd = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleAuth = async (e) => {
    e.preventDefault();

    if (isSignup) {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      if (!name?.trim()) {
        toast.error('Name is not Enterd!');
        return;
      }
      try {
        const res = await axios.post(`${USER_API_END_POINT}/signup`, { name, email, password }, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

        if (res.data.success) {
          setIsSignup(false);
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          toast.success('Signup successful! Please login.');
        }
      } catch (error) {
        toast.error('Signup failed!');
      }
    } else {

      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        })
        if (res.data.success) {
          navigate("/")
          toast.success('welcome back! Rentkaro.com');
          dispatch(setSenderId(res?.data?.user?._id));
          dispatch(setReceiverId(res?.data?.senderIds[0]));
          dispatch(setAllreceivermessagesID(res?.data?.senderIds))
          dispatch(setUser(true))
          dispatch(setDataUser(res?.data?.user))
          dispatch(setLikeData(res?.data?.likedProducts))
          dispatch(setLikeData_id(res?.data?.likedProducts?.map(p => p?._id))); // store liked product IDs
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } catch (error) {
        toast.error('Login failed! Please check your credentials.');
      }
    }
  };

  const changeHandler = () => {
    setIsSignup((prev) => !prev);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };



  return user ? (
    <div className="bg-white dark:bg-gray-900  min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="w-3/5 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md ">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Post Your Ad</h2>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose a category</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories?.map((category) => (
                <li key={category.value} className="py-2">
                  <Link
                    to={`/category`}
                    className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full"
                  >
                    <span className="text-gray-900 dark:text-white">{category?.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Confirm password"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={changeHandler}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "? Log In" : "? Sign Up"}
          </button>

        </p>
      </div>
    </div>
  );
};

export default PostYourAd;
