import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const clickDeleteSlice = createSlice({
  name: 'clickDelete',
  initialState,
  reducers: {
    onClickDelete: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    dontClickDelete: (state) =>{
      state.value= false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onClickDelete,dontClickDelete } = clickDeleteSlice.actions

export default clickDeleteSlice.reducer