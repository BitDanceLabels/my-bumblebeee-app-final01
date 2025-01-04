// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { Provider } from 'react-redux'; // Import Redux Provider
// import { store } from './redux/stote'; // Import Redux Store

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}> {/* Bọc App bằng Redux Provider */}
//       <App />
//     </Provider>
//   </StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App";

// Redux Store
import { Provider } from "react-redux";
import store from "./store/index"; // Đường dẫn chính xác tới store của bạn

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);