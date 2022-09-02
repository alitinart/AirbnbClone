import { configureStore } from "@reduxjs/toolkit";
import { State } from "../models/state.model";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
