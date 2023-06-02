import { FIND_EMAIL, FIND_PWD, CHANGE_PWD } from "../types";

import axios from "axios";

// 이메일 찾기
export function findEmail(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_FIND_EMAIL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      name: data.name.value,
      question: data.question.value,
      answer: data.answer.value,
    },
  })
    .then((response) => {
      let result = {
        result: true,
        email: response.data.email,
      };
      return result;
    })
    .catch((err) => {
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
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      name: data.name.value,
      email: data.email.value,
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
    type: FIND_PWD,
    payload: request,
  };
}

// 비밀번호 재설정
export function changePwd(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CHANGE_PWD,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      email: data.email.value,
      newPwd: data.pwd1.value,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: CHANGE_PWD,
    payload: request,
  };
}
