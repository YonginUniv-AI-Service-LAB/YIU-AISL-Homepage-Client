import { FIND_EMAIL, FIND_PWD, CHANGE_PWD } from "../types";

import axios from "axios";

// 이메일 찾기
export function findEmail(data) {
  console.log(
    "이메일찾기 액션: ",
    data.name.value,
    data.question.value,
    data.answer.value
  );
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
      return {
        result: true,
        email: response.data.email,
      };
    })
    .catch((err) => {
      console.log("이메일 찾기 에러", err.response.status);
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
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      email: data.email.value,
      newPwd: data.pwd.value,
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
