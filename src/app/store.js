import { configureStore } from "@reduxjs/toolkit";

//setting up redux store - boilerplate code
const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), //return
});

export default store;
