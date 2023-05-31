import { GET_MAIN, JOIN, LOGIN, LOGOUT } from "../types";
import { data_notice_main } from "../../assets/data/notice";
import { data_community_main } from "../../assets/data/community";
import { data_plan } from "../../assets/data/plan";

import axios from "axios";

// 메인 데이터 가져오기
export function getMain() {
  const data = {
    notice: data_notice_main,
    community: data_community_main,
    plan: data_plan,
  };
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GET_MAIN,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("메인 데이터 에러", err);
      return false;
    });

  return {
    type: GET_MAIN,
    // payload: request,
    payload: data,
  };
}

// 회원가입
export function join(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + process.env.REACT_APP_JOIN,
    header: {
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
      return true;
    })
    .catch((err) => {
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
    url: process.env.REACT_APP_API_URL + process.env.REACT_APP_LOGIN,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      email: data.email.value,
      pwd: data.pwd.value,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.log("로그인 에러", err);
      return err.response.data;
    });

  return {
    type: LOGIN,
    payload: request,
  };
}

// 로그아웃
export function logout(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + process.env.REACT_APP_LOGOUT,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.log("로그아웃 에러", err);
      return err.response.data;
    });

  return {
    type: LOGOUT,
    payload: request,
  };
}
