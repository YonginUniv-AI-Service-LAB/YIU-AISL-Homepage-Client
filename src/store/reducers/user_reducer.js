import { FIND_EMAIL, FIND_PWD, CHANGE_PWD } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case FIND_EMAIL:
      return {
        ...state,
        findemail: action.payload || false,
      };
    case FIND_PWD:
      return {
        ...state,
        findpwd: action.payload || false,
      };
    case CHANGE_PWD:
      return {
        ...state,
        change_pwd: action.payload || false,
      };
    default:
      return state;
  }
}
