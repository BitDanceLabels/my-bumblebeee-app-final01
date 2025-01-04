import { createSlice } from '@reduxjs/toolkit'
// let nextId = 1; // Biến để lưu trữ ID tiếp theo, bắt đầu từ 1

const initialState = {
  value: false,
  data:[]
}

export const clickVideoSlice = createSlice({
  name: 'clickVideo',
  initialState,
  reducers: {
    onClickVideo: (state,action) => {
      state.value = true;
      const newItem = { ...action.payload }; // Thêm id và payload vào newItem
      state.data.push(newItem);
    },
    dontClickVideo: (state) =>{
      state.value= false;
    },
    deleteDataByIdVideo: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item,index) => item.id !== idToDelete);

    },
    dataUndefinedVideo:(state, action) => {
      // nextId = 1 
    },
  },
})

// Action creators are generated for each case reducer function
export const { onClickVideo,dontClickVideo,deleteDataByIdVideo,dataUndefinedVideo } = clickVideoSlice.actions

export default clickVideoSlice.reducer