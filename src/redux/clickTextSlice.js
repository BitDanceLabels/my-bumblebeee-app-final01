import { createSlice } from '@reduxjs/toolkit';

// let nextId = 1; // Biến để lưu trữ ID tiếp theo, bắt đầu từ 1

const initialState = {
  value: false,
  currentInputValue: '', // Dữ liệu tạm thời từ ô input 1
  data: [],
};

export const clickTextSlice = createSlice({
  name: 'clickText',
  initialState,
  reducers: {
    setInputValueText: (state, action) => {
      state.currentInputValue = action.payload;
      state.value = true;
    },
    onClickInputText: (state) => {
      
        state.data = [
          ...state.data,
          {
            id: state.currentInputValue.selectDataTextId, 
            value: state.currentInputValue.value,
          },
        ];
        state.currentInputValue = ''; // Reset dữ liệu tạm thời của ô input 1
      // state.value = false;
      state.value = true;

    },
    dontClickInputText: (state) => {
      state.value = false;
    },
    deleteDataByIdText: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item) => item.id !== idToDelete);
    },

    dataUndefinedText:(state, action) => {
      // nextId = 1 
    },
  },
});

export const { setInputValueText, onClickInputText, dontClickInputText, deleteDataByIdText,dataUndefinedText } =
  clickTextSlice.actions;

export default clickTextSlice.reducer;
