import {
  FIND_EMAIL,
  FIND_PWD,
  CHANGE_PWD,
  GET_USERS,
  GET_WAITING_USERS,
  ENTER_ADMIN,
  REFUSE_ADMIN,
} from "../types";

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

// 유저 조회
export function getUsers() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_USERS,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      console.log("유저 조회 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("유저 조회 에러", err);
      return err.response.status;
    });

  return {
    type: GET_USERS,
    payload: request,
  };
}

// 유저 조회
export function getWaitingUsers() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_WAITING_USERS,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      console.log("대기중인 유저 조회 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("대기중인 유저 조회 에러", err);
      return err.response.status;
    });

  return {
    type: GET_WAITING_USERS,
    payload: request,
  };
}

// 랩실 멤버 승인
export function enterAdmin(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_ENTER_ADMIN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      userid: data.userid,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: ENTER_ADMIN,
    payload: request,
  };
}

// 랩실 멤버 승인 철회
export function refuseAdmin(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_REFUSE_ADMIN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      userid: data.userid,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: REFUSE_ADMIN,
    payload: request,
  };
}
