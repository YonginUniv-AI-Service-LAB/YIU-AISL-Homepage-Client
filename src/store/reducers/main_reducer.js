import { GET_MAIN, LOGIN, JOIN } from "../types";
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
      return {
        ...state,
        join: action.payload || false,
      };
    case LOGIN:
      return {
        ...state,
        login: action.payload || false,
      };
    default:
      return state;
  }
}
