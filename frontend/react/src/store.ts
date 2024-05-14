import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/currentUser/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
