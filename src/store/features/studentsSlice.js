// src/studentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = [
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 3,
    name: "Hanni",
    url: "https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/7/hanni-1675756187946593312837-98-71-1048-1885-crop-16757562089671073468104.jpeg",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 4,
    name: "Faker",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Faker_2020_interview.jpg/250px-Faker_2020_interview.jpg",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 5,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 6,
    name: "Gumayusi",
    url: "https://gamek.mediacdn.vn/133514250583805952/2023/11/2/gumayusi-1-1698894342041677503320.jpg",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 7,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 8,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 5,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 6,
    name: "Gumayusi",
    url: "https://gamek.mediacdn.vn/133514250583805952/2023/11/2/gumayusi-1-1698894342041677503320.jpg",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 7,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 8,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
];

// Create a slice
const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    add: (state, action) => {
      // 'action.payload' should contain the new student object
      state.push(action.payload);
    },
    update: (state, action) => {
      // 'action.payload' should contain the updated student object
      const index = state.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    remove: (state, action) => {
      // 'action.payload' should contain the student id to be removed
      return state.filter(student => student.id !== action.payload);
    },
  },
});

// Export actions
export const studentsActions = studentsSlice.actions;

// Export reducer
export default studentsSlice.reducer;
