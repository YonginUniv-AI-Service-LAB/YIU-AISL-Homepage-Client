import { GET_MAIN, JOIN, LOGIN, LOGOUT, REFRESH } from "../types";
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
      return response.data;
    })
    .catch((err) => {
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
      const { accessToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("userid", response.data.user.userid);
      sessionStorage.setItem("name", response.data.user.name);
      sessionStorage.setItem("eamil", response.data.user.email);
      sessionStorage.setItem("master", response.data.user.master);
      return true;
    })
    .catch((err) => {
      return err.response.status;
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
    url: process.env.REACT_APP_LOGOUT,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: LOGOUT,
    payload: request,
  };
}

// 로그인
export function refresh(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_REFRESH,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {},
  })
    .then((response) => {
      const { accessToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      return true;
    })
    .catch((err) => {
      console.log("리프레시 에러: ", err.response.status);
      return err.response.status;
    });

  return {
    type: REFRESH,
    payload: request,
  };
}
