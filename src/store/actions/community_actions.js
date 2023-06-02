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
  const data = {
    plan: data_plan,
    post: data_community,
  };
  console.log("액션: ", data);
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_COMMUNITY,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("커뮤니티 에러", err);
      return err.response.status;
    });

  return {
    type: GET_COMMUNITY,
    payload: data,
  };
}

// 일정 생성
export function createPlan(data) {
  console.log(
    "일정생성 액션: ",
    data.date.value.format("YYYY-MM-DD"),
    data.contents.value
  );
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CREATE_PLAN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      date: data.date.value.format("YYYY-MM-DD"),
      contents: data.contents.value,
    },
  })
    .then((response) => {
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
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_UPDATE_PLAN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      planid: data.planid.value,
      date: data.date.value,
      contents: data.contents.value,
    },
  })
    .then((response) => {
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
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_DELETE_PLAN,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      id: data,
    },
  })
    .then((response) => {
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
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CREATE_POST,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      contents: data.contents.value,
    },
  })
    .then((response) => {
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
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_UPDATE_POST,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      postid: data.postid.value,
      contents: data.contents.value,
    },
  })
    .then((response) => {
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
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_DELETE_POST,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      postid: data,
    },
  })
    .then((response) => {
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
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_LIKE,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      postid: data,
    },
  })
    .then((response) => {
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
