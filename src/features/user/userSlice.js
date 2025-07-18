import { createSlice } from "@reduxjs/toolkit";

// 1. Initial State Definition
const initialState = {
  name: null, // Empty string as default value
  email: null, // These property names can be anything you choose
  photo: null, // They're just defining the structure of your user state
};

// 2. Slice Creation
const userSlice = createSlice({
  name: "user", // Name of this slice in Redux store, used for debug
  initialState, // Default state defined above
  reducers: {
    // Functions to update state
    //needs state and action because we receiving data
    setUserLoginDetails: (state, action) => {
      // state = current state
      // action.payload = data you send when dispatching
      state.name = action.payload.name; // Update state with new values
      state.email = action.payload.email; // These property names MUST match
      state.photo = action.payload.photo; // what you send in payload
    },

    //only need state because we only reset data
    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

//The property names (name, email, photo) in initialState define the structure of your state
//state = current values in Redux store
// action = package of new data being sent
//action.payload = the actual data inside the package

// 1. Export actions for dispatching - the controls
export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

// 2. Export selectors for accessing state 0 the display
export const selectUserName = (state) => state.user?.name;
export const selectUserEmail = (state) => state.user?.email;
export const selectUserPhoto = (state) => state.user?.photo;

// 3. Export reducer for store setup (REQUIRED), required for redux to work - the engine
export default userSlice.reducer;
