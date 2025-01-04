import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const ActiveTools = createSlice({
  name: "tools",
  initialState,
  reducers: {
    IsActiveTools: (state) => {
      state.value = true;
    },
    NotActiveTools: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { IsActiveTools, NotActiveTools } = ActiveTools.actions;

export default ActiveTools.reducer;
