import {
  FIND_EMAIL,
  FIND_PWD,
  CHANGE_PWD,
  GET_ALL_USER,
  GET_WAITING_USER,
  ENTER_USER,
  REFUSE_USER,
  GIVE_AUTH,
} from "../types";

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
    case GET_ALL_USER:
      return {
        ...state,
        get_all_user: action.payload || false,
      };
    case GET_WAITING_USER:
      return {
        ...state,
        get_waiting_user: action.payload || false,
      };
    case ENTER_USER:
      return {
        ...state,
        enter_user: action.payload || false,
      };
    case REFUSE_USER:
      return {
        ...state,
        refuse_user: action.payload || false,
      };
    case GIVE_AUTH:
      return {
        ...state,
        give_auth: action.payload || false,
      };
    default:
      return state;
  }
}
