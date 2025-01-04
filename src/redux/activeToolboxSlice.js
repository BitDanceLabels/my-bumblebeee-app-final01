import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const ActiveToolbox = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    IsActiveToolbox: (state) => {
      state.value = true;
    },
    NotActiveToolbox: (state) => {
      state.value = false;
    },
  },
});

export const { IsActiveToolbox, NotActiveToolbox } = ActiveToolbox.actions;

export default ActiveToolbox.reducer;
