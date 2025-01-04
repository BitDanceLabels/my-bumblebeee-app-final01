import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 value:{
    defaultBoxSize: {
        width: 250,
        height: 150
      },
      tabletScreenSize: 768
 } 
};

export const DefaultGlobalValue = createSlice({
  name: "defaultGlobalValue",
  initialState,
  reducers: {
    GetDefaultGlobalValue: (state, action) => {
      switch(action.type) {
        case 'DEFAULT':
            return {...state, defaultBoxSize:action.payload};
        default:
            return state;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetDefaultGlobalValue } = DefaultGlobalValue.actions;

export default DefaultGlobalValue.reducer;
