import {
  FIND_EMAIL,
  FIND_PWD,
  CHANGE_PWD,
  GET_ALL_USER,
  GET_WAITING_USER,
  ENTER_USER,
  REFUSE_USER,
  GIVE_AUTH,
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
export function getAllUser() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_ALL_USER,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {},
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: GET_ALL_USER,
    payload: request,
  };
}

// 회원 대기 유저 조회
export function getWaitingUser() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_WAITING_USER,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {},
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: GET_WAITING_USER,
    payload: request,
  };
}

// 랩실 멤버 승인
export function enterUser(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_ENTER_USER,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      userid: data,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: ENTER_USER,
    payload: request,
  };
}

// 랩실 멤버 승인 철회
export function refuseUser(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_REFUSE_USER,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      userid: data,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: REFUSE_USER,
    payload: request,
  };
}

// 마스터 권한 승인
export function giveAuth(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GIVE_AUTH,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      userid: data,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: GIVE_AUTH,
    payload: request,
  };
}
