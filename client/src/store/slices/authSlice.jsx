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
    setSinglePost: (state, action) => {
      state.posts.push(action.payload);
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("User'd friends are non existent!");
      }
    },
  },
});

export const { setCredentials, setMode, setPosts, setSinglePost, setFriends } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
