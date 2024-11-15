import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"; //can import with any name cause export default from userslice.js

//setting up redux store - boilerplate code
const store = configureStore({
  reducer: {
    user: userReducer, //could name user anything
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), //return
});

export default store;
