import { GET_MAIN, JOIN, LOGIN, LOGOUT } from "../types";
import { data_notice_main } from "../../assets/data/notice";
import { data_community_main } from "../../assets/data/community";
import { data_plan } from "../../assets/data/plan";

import axios from "axios";

// 메인 데이터 가져오기
export function getMain() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_MAIN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      console.log("메인 데이터 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("메인 데이터 에러", err.response.status);
      return false;
    });

  return {
    type: GET_MAIN,
    // payload: request,
    payload: request,
  };
}

// 회원가입
export function join(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_JOIN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      name: data.name.value,
      email: data.email.value,
      pwd: data.pwd1.value,
      question: data.question.value,
      answer: data.answer.value,
    },
  })
    .then((response) => {
      console.log("회원가입 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("회원가입 에러: ", err.response.status);
      return err.response.status;
    });

  return {
    type: JOIN,
    payload: request,
  };
}

// 로그인
export function login(data) {
  console.log("로그인 액션: ", data.email.value, data.pwd.value);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_LOGIN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      email: data.email.value,
      pwd: data.pwd.value,
    },
  })
    .then((response) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      console.log("로그인 성공: ", response);
      sessionStorage.setItem("userid", 1);
      sessionStorage.setItem("name", "변미현");
      sessionStorage.setItem("eamil", "bmh2038@naver.com");
      sessionStorage.setItem("master", 2);
      return true;
    })
    .catch((err) => {
      console.log("로그인 에러: ", err.response.status);
      return err.response.status;
    });

  return {
    type: LOGIN,
    payload: request,
  };
}

// 로그아웃
export function logout(data) {
  console.log("로그아웃 액션");
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_LOGOUT,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      console.log("로그아웃 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("로그아웃 에러", err);
      return err.response.status;
    });

  return {
    type: LOGOUT,
    payload: request,
  };
}
