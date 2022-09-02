import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
  },
  reducers: {
    login: (user, action) => {
      toast.success("You have logged in");
      user.token = action.payload.token;
    },
    logout: (user) => {
      localStorage.removeItem("token");
      toast.success("Logged off account");
      user.token = null;
    },
    refresh: (user, action) => {
      user.token = action.payload.token;
    },
    expiredToken: (user) => {
      localStorage.removeItem("token");
      toast.error(
        "You've been logged out since your Token has expired. Please login again"
      );
      user.token = null;
    },
  },
});

export const { login, logout, refresh, expiredToken } = userSlice.actions;
export default userSlice.reducer;
