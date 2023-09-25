import { GET_MAIN, LOGIN, LOGOUT, JOIN, REFRESH } from "../types";
import { take } from "lodash";
// import {data_community} from '../../assets/data/community';

// const initialState = {
//   main: false,
//   counter: 0
// };

export default function (state = {}, action) {
  switch (action.type) {
    case GET_MAIN:
      return {
        ...state,
        notice: action.payload.notice || [],
        post: action.payload.post || [],
        plan: action.payload.plan || [],
        project: take(action.payload.project, 3) || [],
      };
    case JOIN:
      return {
        ...state,
        join: action.payload || false,
      };
    case LOGIN:
      return {
        ...state,
        login: action.payload || false,
      };
    case LOGOUT:
      return {
        ...state,
        logout: action.payload || false,
      };
    case REFRESH:
      return {
        ...state,
        refresh: action.payload || false,
      };
    default:
      return state;
  }
}
