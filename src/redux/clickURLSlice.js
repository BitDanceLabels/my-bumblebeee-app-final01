import { createSlice } from '@reduxjs/toolkit'
// let nextId = 1; // Biến để lưu trữ ID tiếp theo, bắt đầu từ 1

const initialState = {
  value: false,
  currentInputValue: '', // Dữ liệu tạm thời từ ô input 1
  data: [],
}

export const clickURLSlice = createSlice({
  name: 'clickUrl',
  initialState,
  reducers: {
    setInputValueUrl: (state, action) => {
      state.currentInputValue = action.payload;
      state.value = true;
    },
    onClickInputUrl: (state) => {

      state.data = [
        ...state.data,
        {
          id: state.currentInputValue.selectDataUrlId, // Sử dụng nextId và sau đó tăng giá trị cho ID tiếp theo
          value: state.currentInputValue,
        },
      ];
      state.currentInputValue = ''; // Reset dữ liệu tạm thời của ô input 1
      // state.value = false;
    },
    dontClickInputUrl: (state) => {
      state.value = false;
    },
    deleteDataByIdUrl: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((item, index) => item.id !== idToDelete);

    },
    dataUndefinedUrl: (state, action) => {
      // nextId = 1 
    },
  },
})

// Action creators are generated for each case reducer function
export const { setInputValueUrl, onClickInputUrl, dontClickInputUrl, deleteDataByIdUrl, dataUndefinedUrl } = clickURLSlice.actions

export default clickURLSlice.reducer