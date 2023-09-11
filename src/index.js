// IE11의 경우
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, applyMiddleware, compose } from "redux";
import axios from "axios";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";
import reducers from "./store/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = process.env.REACT_APP_DEV_IN_SCHOOL;
axios.defaults.withCredentials = true;
// axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
// console.log("스토어의 상태: ", createStoreWithMiddleware.getState());

// const setToken = (token) => {
//   // axios.defaults. use((config) => {
//   //   config.headers["Authorization"] = "Bearer " + token;
//   //   return config;
//   // });
//   // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   console.log("index: ", axios.defaults.headers.common.Authorization);
// };

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={createStoreWithMiddleware}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
