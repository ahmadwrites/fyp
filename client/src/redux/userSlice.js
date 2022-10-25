import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    followGroup: (state, action) => {
      if (state.currentUser.followedGroups.includes(action.payload)) {
        state.currentUser.followedGroups.splice(
          state.currentUser.followedGroups.findIndex(
            (groupId) => groupId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.followedGroups.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, followGroup } =
  userSlice.actions;

export default userSlice.reducer;
