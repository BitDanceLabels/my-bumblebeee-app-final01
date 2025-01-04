import { createSlice, createAction } from '@reduxjs/toolkit'
export const setClickSelectData = createAction('clickSelect/setClickSelectData');
const initialState = {
    value: false,
    data: {
        id: [],
        type: [],
    },
}

export const clickSelectData = createSlice({
    name: 'clickSelect',
    initialState,
    reducers: {
        // onClickSelectData: (state, action) => {
        //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //   // doesn't actually mutate the state because it uses the Immer library,
        //   // which detects changes to a "draft state" and produces a brand new
        //   // immutable state based off those changes
        //   state.value = true;
        //   state.data = action.payload
        // },
        onClickSelectData: (state, action) => {
            // Xử lý action setClickSelectData
            state.value = true;
            // Loại bỏ giá trị không tuần tự hóa trước khi gán cho trạng thái Redux
            const { children, ...rest } = action.payload;
            state.data = { ...rest };
        },
        dontClickSelectData: (state) => {
            state.value = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { onClickSelectData, dontClickSelectData } = clickSelectData.actions

export default clickSelectData.reducer