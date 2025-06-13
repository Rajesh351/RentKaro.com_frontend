import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    user: false,
    likeData :[],
    likeData_id:[],
    postData:[],
  },
  reducers: {
    setDataUser: (state, action) => {
      state.userData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload; // Set the user state
    },
    setLikeData:(state, action) => {
      state.likeData = action.payload; // Set the user state
    },
    setPostData:(state, action) => {
      state.postData = action.payload; // Set the user state
    },
    setLikeData_id:(state, action) => {
      state.likeData_id= action.payload; // Set the user state
    },
  },
});

export const { setDataUser, setUser,setLikeData,setPostData,setLikeData_id } = userSlice.actions;
export default userSlice.reducer;
