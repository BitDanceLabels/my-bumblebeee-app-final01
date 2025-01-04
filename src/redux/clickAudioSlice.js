import { createSlice } from '@reduxjs/toolkit'
// let nextId = 1; // Biến để lưu trữ ID tiếp theo, bắt đầu từ 1

const initialState = {
  value: false,
  data:[]
}

export const clickAudioSlice = createSlice({
  name: 'clickAudio',
  initialState,
  reducers: {
    onClickAudio: (state,action) => {
      state.value = true;
      const newItem = {...action.payload }; // Thêm id và payload vào newItem
      state.data.push(newItem);
    },
    dontClickAudio: (state) =>{
      state.value= false;
    },
    deleteDataByIdAudio: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item,index) => item.id !== idToDelete);
    },
    dataUndefinedAudio:(state, action) => {
      // nextId = 1 
    },
  },
})

// Action creators are generated for each case reducer function
export const { onClickAudio,dontClickAudio,deleteDataByIdAudio,dataUndefinedAudio } = clickAudioSlice.actions

export default clickAudioSlice.reducer