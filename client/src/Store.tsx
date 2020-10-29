import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/userSlice";

export default configureStore({
  reducer: {
    loggedIn: loginReducer,
  },
});
