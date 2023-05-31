import { GET_MAIN, LOGIN, LOGOUT, JOIN } from "../types";
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
        notice: action.payload.notice || false,
        community: action.payload.community || false,
        plan: action.payload.plan || false,
      };
    case JOIN:
      console.log("리듀서: ", action.payload);
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
    default:
      return state;
  }
}
