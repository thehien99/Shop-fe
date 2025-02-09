import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    payload: "",
    payloadRegister: {},
    isLogin: false,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.accessToken
      state.payload = action.payload.msg
      state.isLogin = !!action.payload.accessToken
      localStorage.setItem('token', action.payload.accessToken)
    },
    loginFailed: (state, action) => {
      state.payload = action.payload;
      state.isLogin = false
    },
    registerSuccess: (state, action) => {
      state.token = action.payload.accessToken && localStorage.setItem('token', action.payload.accessToken)
      state.payloadRegister = action.payload.user.name
      state.isLogin = action.payload.accessToken && true
    },
    registerFailed: (state) => {
      state.isLogin = false
    },
    logoutSuccess: (state) => {
      state.token = null; // Xóa token trong state
      state.isLogin = false; // Cập nhật trạng thái đăng xuất
      state.payload = null;
      localStorage.removeItem('token')
    },

  },
});

export const { loginFailed, loginSuccess, logoutSuccess, registerSuccess, registerFailed } = authReducer.actions;

export default authReducer.reducer;