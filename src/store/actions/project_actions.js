import {
  GET_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT_DETAIL,
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
      return response.data;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: GET_PROJECT,
    payload: request,
  };
}

// 공지사항 생성
// multi form data 형식으로 변경해야함!!!!!!!!!!!!
export function createProject(data, img) {
  const formData = new FormData();
  formData.append("title", data.title.value);
  formData.append("contents", data.contents.value);
  formData.append("link", data.link.value);
  formData.append("img", img);

  const request = axios
    .post(process.env.REACT_APP_CREATE_PROJECT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      transformRequest: [
        function () {
          return formData;
        },
      ],
    })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return false;
    });

  return {
    type: CREATE_PROJECT,
    payload: request,
  };
}

// 공지사항 수정
export function updateProject(data, img) {
  const formData = new FormData();
  formData.append("projectid", data.projectid.value);
  formData.append("title", data.title.value);
  formData.append("contents", data.contents.value);
  formData.append("link", data.link.value);
  formData.append("img", img);

  const request = axios
    .post(process.env.REACT_APP_UPDATE_PROJECT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      transformRequest: [
        function () {
          return formData;
        },
      ],
    })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return false;
    });

  return {
    type: UPDATE_PROJECT,
    payload: request,
  };
}

// 프로젝트 삭제
export function deleteProject(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_DELETE_PROJECT,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    data: {
      projectid: data,
    },
  })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return err.response.status;
    });

  return {
    type: DELETE_PROJECT,
    payload: request,
  };
}

// 공지사항 상세보기
export function getProjectDetail(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GET_PROJECT_DETAIL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      projectid: data,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return false;
    });

  return {
    type: GET_PROJECT_DETAIL,
    payload: request,
    // payload: data_notice_detail,
  };
}
