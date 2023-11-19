/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    value: false,
  },
  reducers: {
    Toggle_Login: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Toggle_Login } = AuthSlice.actions;

export default AuthSlice.reducer;
