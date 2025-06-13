import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
     senderID: null, // Initialize senderID to null
     receiverID: null, // Initialize receiverID to null
     allreceivermessagesID:[],
     filteredPosts:[],
  },
  reducers: {
    setSenderId: (state, action) => {
      state.senderID = action.payload; // Set the message state
    },
    setReceiverId: (state, action) => {
      state.receiverID = action.payload; // Set the message state
    },
    setAllreceivermessagesID: (state, action) => {
      state.allreceivermessagesID = action.payload; // Set the message state
    },  
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload; // Set the filtered posts state
    }
  },
});

export const { setReceiverId,setSenderId,setAllreceivermessagesID,setFilteredPosts} = messageSlice.actions;
export default messageSlice.reducer;
