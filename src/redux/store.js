import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the reducer correctly
import messageSlice from './messageSlice';

export default configureStore({
  reducer: {
    auth: userReducer,
    message:messageSlice // Key 'auth' is being mapped correctly
  },
});
