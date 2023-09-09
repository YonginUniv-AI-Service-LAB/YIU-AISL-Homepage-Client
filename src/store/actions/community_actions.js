import {
  GET_COMMUNITY,
  CREATE_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE,
} from "../types";
import axios from "axios";

import { data_community } from "../../assets/data/community";
import { data_plan } from "../../assets/data/plan";

// 커뮤니티 가져오기
export function getCommunity() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_COMMUNITY,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      console.log("커뮤니티 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("커뮤니티 에러", err);
      return err.response.status;
    });

  return {
    type: GET_COMMUNITY,
    payload: request,
  };
}

// 일정 생성
export function createPlan(data) {
  console.log("일정생성 액션: ", data, data.date.value.format("YYYY-MM-DD"));
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CREATE_PLAN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      date: data.date.value.format("YYYY-MM-DD"),
      contents: data.contents.value,
    },
  })
    .then((response) => {
      console.log("일정 생성 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("일정 생성 에러", err);
      return err.response.status;
    });

  return {
    type: CREATE_PLAN,
    payload: request,
  };
}

// 일정 수정
export function updatePlan(data) {
  console.log("일정수정 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_UPDATE_PLAN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      planid: data.planid.value,
      date: data.date.value.format("YYYY-MM-DD"),
      contents: data.contents.value,
    },
  })
    .then((response) => {
      console.log("일정 수정 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("일정 수정 에러", err);
      return err.response.status;
    });

  return {
    type: UPDATE_PLAN,
    payload: request,
  };
}

// 일정 삭제
export function deletePlan(data) {
  console.log("일정삭제 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_DELETE_PLAN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      planid: data,
    },
  })
    .then((response) => {
      console.log("일정 삭제 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("일정 삭제 에러", err);
      return err.response.status;
    });

  return {
    type: DELETE_PLAN,
    payload: request,
  };
}

// 게시글 생성
export function createPost(data) {
  console.log("게시글 생성 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CREATE_POST,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      contents: data.contents.value,
    },
  })
    .then((response) => {
      console.log("게시글 생성 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("게시글 생성 에러", err);
      return err.response.status;
    });

  return {
    type: CREATE_POST,
    payload: request,
  };
}

// 게시글 수정
export function updatePost(data) {
  console.log("게시글 수정 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_UPDATE_POST,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      postid: data.postid.value,
      contents: data.contents.value,
    },
  })
    .then((response) => {
      console.log("게시글 수정 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("게시글 수정 에러", err);
      return err.response.status;
    });

  return {
    type: UPDATE_POST,
    payload: request,
  };
}

// 게시글 삭제
export function deletePost(data) {
  console.log("게시글 삭제 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_DELETE_POST,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      postid: data,
    },
  })
    .then((response) => {
      console.log("게시글 삭제 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("게시글 삭제 에러", err);
      return err.response.status;
    });

  return {
    type: DELETE_POST,
    payload: request,
  };
}

// 게시글 공감
export function like(data) {
  console.log("게시글 공감 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_LIKE,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      postid: data,
    },
  })
    .then((response) => {
      console.log("게시글 공감 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("게시글 공감 에러", err);
      return err.response.status;
    });

  return {
    type: LIKE,
    payload: request,
  };
}
