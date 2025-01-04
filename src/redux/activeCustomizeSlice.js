import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const ActiveCustomize = createSlice({
  name: "customize",
  initialState,
  reducers: {
    IsActiveCustomize: (state) => {
      state.value = true;
    },
    NotActiveCustomize: (state) => {
      state.value = false;
    },
  },
});

export const { IsActiveCustomize, NotActiveCustomize } =
  ActiveCustomize.actions;

export default ActiveCustomize.reducer;
