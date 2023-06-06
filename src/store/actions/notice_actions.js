import {
  GET_NOTICE,
  CREATE_NOTICE,
  UPDATE_NOTICE,
  DELETE_NOTICE,
  GET_NOTICE_DETAIL,
} from "../types";

import { data_notice, data_notice_detail } from "../../assets/data/notice";

import axios from "axios";

// 공지사항 가져오기
export function getNotice() {
  const request = axios({
    method: "GET",
    url: process.env.REACT_APP_GET_NOTICE,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {},
  })
    .then((response) => {
      console.log("공지사항 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("공지사항 에러", err);
      return false;
    });

  return {
    type: GET_NOTICE,
    payload: request,
    // payload: data_notice,
  };
}

// 공지사항 생성
// multi form data 형식으로 변경해야함!!!!!!!!!!!!
export function createNotice(data, img) {
  const formData = new FormData();
  formData.append("title", data.title.value);
  formData.append("contents", data.contents.value);
  formData.append("img", img);
  console.log("액션 데이터: ", data);
  console.log("액션에서 img: ", img);

  const request = axios
    .post(process.env.REACT_APP_CREATE_NOTICE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [
        function () {
          return formData;
        },
      ],
    })
    .then((response) => {
      console.log("공지사항 생성 성공: ", response);
      return true;
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

// const request = axios({
//   method: "POST",
//   url: process.env.REACT_APP_CREATE_NOTICE,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
//   data: formData,
// })
//   .then((response) => {
//     console.log("공지사항 생성 성공: ", response);
//     return response.data;
//   })
//   .catch((err) => {
//     console.log("공지사항 생성 에러", err);
//     return false;
//   });

// 공지사항 수정
export function updateNotice(data, img) {
  const formData = new FormData();
  formData.append("noticeid", data.noticeid.value);
  formData.append("title", data.title.value);
  formData.append("contents", data.contents.value);
  formData.append("img", img);
  console.log("액션 데이터: ", data);
  console.log("액션에서 img: ", img);

  // const request = axios({
  //   method: "POST",
  //   url: process.env.REACT_APP_UPDATE_NOTICE,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   data: formData,
  // })
  const request = axios
    .post(process.env.REACT_APP_UPDATE_NOTICE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [
        function () {
          return formData;
        },
      ],
    })
    .then((response) => {
      console.log("공지사항 수정 성공: ", response);
      return true;
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
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      noticeid: data,
    },
  })
    .then((response) => {
      console.log("공지사항 삭제 성공: ", response);
      return true;
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

// 공지사항 상세보기
export function getNoticeDetail(data) {
  const request = axios({
    method: "POST",
    url: process.env.REACT_APP_GET_NOTICE_DETAIL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      noticeid: data,
    },
  })
    .then((response) => {
      console.log("공지사항 상세보기 성공: ", response);
      return response.data;
    })
    .catch((err) => {
      console.log("공지사항 상세보기 에러", err);
      return false;
    });

  return {
    type: GET_NOTICE_DETAIL,
    payload: request,
    // payload: data_notice_detail,
  };
}
