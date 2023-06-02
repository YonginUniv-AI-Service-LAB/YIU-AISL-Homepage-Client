import { FIND_EMAIL, FIND_PWD, CHANGE_PWD } from "../types";

import axios from "axios";

// 이메일 찾기
export function findEmail(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_FIND_EMAIL,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      name: data.name,
      question: data.question,
      answer: data.answer,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.log("이메일 찾기 에러", err);
      return err.response.status;
    });

  return {
    type: FIND_EMAIL,
    payload: request,
  };
}

// 비밀번호 찾기
export function findPwd(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_FIND_PWD,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      name: data.name,
      email: data.email,
      question: data.question,
      answer: data.answer,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.log("비밀번호 찾기 에러", err);
      return err.response.status;
    });

  return {
    type: FIND_PWD,
    payload: request,
  };
}

// 비밀번호 재설정
export function changePwd(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CHANGE_PWD,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      email: data.email,
      pwd: data.pwd,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.log("비밀번호 재설정 에러", err);
      return err.response.status;
    });

  return {
    type: CHANGE_PWD,
    payload: request,
  };
}
