import { createSlice } from "@reduxjs/toolkit";
const isAuthenticated = localStorage.getItem("token");
let initialState = {
  isLogin: isAuthenticated,
  logedInUser: JSON.parse(sessionStorage.getItem("_userDetails")),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setLogedInUser: (state, action) => {
      state.logedInUser = action.payload;
    },
  },
});
export const { setIsLogin, setLogedInUser } = authSlice.actions;
export default authSlice.reducer;
