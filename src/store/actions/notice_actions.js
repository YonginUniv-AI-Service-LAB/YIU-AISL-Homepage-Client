import {
  GET_NOTICE,
  GET_NOTICE_DETAIL,
  CREATE_NOTICE,
  UPDATE_NOTICE,
  DELETE_NOTICE,
} from "../types";

import { data_notice } from "../../assets/data/notice";

import axios from "axios";

// 공지사항 가져오기
export function getNotice() {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GET_NOTICE,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("공지사항 에러", err);
      return false;
    });

  return {
    type: GET_NOTICE,
    // payload: request,
    payload: data_notice,
  };
}

// 공지사항 상세정보 가져오기 => GET
export function getNoticeDetail(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GET_NOTICE_DETAIL,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      noticeid: data,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("공지사항 상세정보 에러", err);
      return false;
    });

  return {
    type: GET_NOTICE_DETAIL,
    // payload: request,
    payload: data_notice,
  };
}

// 공지사항 생성
// multi form data 형식으로 변경해야함!!!!!!!!!!!!
export function createNotice(data, img) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("contents", data.contents);
  formData.append("img", img);
  console.log("액션에서 img: ", img);

  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_CREATE_NOTICE,
    header: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("공지사항 생성 에러", err);
      return false;
    });

  return {
    type: CREATE_NOTICE,
    payload: request,
  };
}

// 공지사항 수정
export function updateNotice(data, img) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("contents", data.contents);
  formData.append("img", img);
  console.log("액션에서 img: ", img);

  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_UPDATE_NOTICE,
    header: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("공지사항 수정 에러", err);
      return false;
    });

  return {
    type: UPDATE_NOTICE,
    payload: request,
  };
}

// 공지사항 삭제
export function deleteNotice(data) {
  console.log("액션 데이터: ", data);
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_DELETE_NOTICE,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      noticeid: data,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("공지사항 삭제 에러", err);
      return false;
    });

  return {
    type: DELETE_NOTICE,
    payload: request,
  };
}
