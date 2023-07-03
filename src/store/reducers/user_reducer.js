import {
  FIND_EMAIL,
  FIND_PWD,
  CHANGE_PWD,
  GET_USERS,
  GET_WAITING_USERS,
  ENTER_ADMIN,
  REFUSE_ADMIN,
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
    case GET_USERS:
      return {
        ...state,
        get_users: action.payload || false,
      };
    case GET_WAITING_USERS:
      return {
        ...state,
        get_waiting_users: action.payload || false,
      };
    case ENTER_ADMIN:
      return {
        ...state,
        enter_admin: action.payload || false,
      };
    case REFUSE_ADMIN:
      return {
        ...state,
        refuse_admin: action.payload || false,
      };
    default:
      return state;
  }
}
