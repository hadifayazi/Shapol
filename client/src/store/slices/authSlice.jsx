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
      state.user = action.payload;
      state.token = action.payload;
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setCredentials, setMode } = authSlice.actions;
export const authReducer = authSlice.reducer;
