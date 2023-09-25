import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: null,
  },
});

export const setClientHeaders = (token) => {
  // console.log("setClientHeaders1: ", token);
  customAxios.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + token;
    // console.log(
    //   "setClientHeaders1: ",
    //   customAxios.defaults.headers.common.Authorization
    // );
    return config;
  });
};
