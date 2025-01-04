import { createSlice } from '@reduxjs/toolkit';

// let nextId = 1; // Biến để lưu trữ ID tiếp theo, bắt đầu từ 1
const initialState = {
  value: false,
  data: []
};

export const clickImageSlice = createSlice({
  name: 'clickImage',
  initialState,
  reducers: {
    onClickImage: (state, action) => {
      state.value = true;
      const newItem = {...action.payload }; // Thêm id và payload vào newItem
      state.data.push(newItem);
    },
    dontClickImage: (state) => {
      state.value = false;
    },
    deleteDataByIdImage: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item) => item.id !== idToDelete);
    },
    dataUndefinedImage:(state, action) => {
      // nextId = 1 
    },
  },
});

export const { onClickImage, dontClickImage, deleteDataByIdImage,dataUndefinedImage } = clickImageSlice.actions;

export default clickImageSlice.reducer;
