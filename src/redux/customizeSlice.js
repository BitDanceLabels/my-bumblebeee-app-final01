import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  tools: [],
};

export const customizeSlice = createSlice({
  name: "customizeContent",
  initialState,
  reducers: {
    onChangeCustomize: (state, action) => {
      state.title = action.payload;
      state.tools = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChangeCustomize } = customizeSlice.actions;

export default customizeSlice.reducer;
