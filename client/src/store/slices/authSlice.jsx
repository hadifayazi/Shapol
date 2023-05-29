import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  mode: "light",
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setCredentials, setMode, setPosts } = authSlice.actions;
export const authReducer = authSlice.reducer;
