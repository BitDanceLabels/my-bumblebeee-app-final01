import { createSlice } from '@reduxjs/toolkit'
// let nextId = 1; // Biến để lưu trữ ID tiếp theo, bắt đầu từ 1

const initialState = {
  value: false,
  data: []
}

export const clickRecordSlice = createSlice({
  name: 'clickRecord',
  initialState,
  reducers: {
    onClickRecord: (state, action) => {
      state.value = true;
      const newItem = { ...action.payload }; // Thêm id và payload vào newItem
      state.data.push(newItem);
    },
    dontClickRecord: (state) => {
      state.value = false;
    },
    deleteDataByIdRecord: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item, index) => item.id !== idToDelete);

    },
    dataUndefinedRecord:(state, action) => {
      // nextId = 1 
    },
  }
})

// Action creators are generated for each case reducer function
export const { onClickRecord, dontClickRecord, deleteDataByIdRecord,dataUndefinedRecord } = clickRecordSlice.actions

export default clickRecordSlice.reducer