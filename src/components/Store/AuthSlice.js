import { createSlice } from "@reduxjs/toolkit";


const isLoggedIn = localStorage.getItem("token") ? true : false;
const authSlice = createSlice({
  name: "auth",
  initialState: { userLOgin: isLoggedIn },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});
export default authSlice;
export const authSliceActions = authSlice.actions;