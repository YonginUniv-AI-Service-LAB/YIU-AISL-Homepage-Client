import {
  GET_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../types";
import axios from "axios";

import { data_project } from "../../assets/data/project";

// 프로젝트 조회
export function getProject() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_PROJECT,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      console.log("프로젝트 조회 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("프로젝트 조회 에러", err);
      return err.response.status;
    });

  return {
    type: GET_PROJECT,
    payload: data_project,
  };
}

// 프로젝트 생성
export function createProject(data) {
  console.log("프로젝트 생성 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CREATE_PROJECT,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      title: data.title.value,
      contents: data.contents.value,
      link: data.link.value,
    },
  })
    .then((response) => {
      console.log("프로젝트 생성 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("프로젝트 생성 에러", err);
      return err.response.status;
    });

  return {
    type: CREATE_PROJECT,
    payload: request,
  };
}

// 프로젝트 수정
export function updateProject(data) {
  console.log("프로젝트 수정 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_UPDATE_PROJECT,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      projectid: data.projectid.value,
      title: data.title.value,
      contents: data.contents.value,
      link: data.link.value,
    },
  })
    .then((response) => {
      console.log("프로젝트 수정 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("일정 수정 에러", err);
      return err.response.status;
    });

  return {
    type: UPDATE_PROJECT,
    payload: request,
  };
}

// 프로젝트 삭제
export function deleteProject(data) {
  console.log("프로젝트 삭제 액션: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_DELETE_PROJECT,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      projectid: data,
    },
  })
    .then((response) => {
      console.log("프로젝트 삭제 성공: ", response);
      return true;
    })
    .catch((err) => {
      console.log("프로젝트 삭제 에러", err);
      return err.response.status;
    });

  return {
    type: DELETE_PROJECT,
    payload: request,
  };
}
