import {
  GET_COMMUNITY,
  CREATE_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE,
} from "../types";

export default function (state = [], action) {
  switch (action.type) {
    case GET_COMMUNITY:
      return {
        ...state,
        community: action.payload || [],
        plan: action.payload.plan || [],
        post: action.payload.post || [],
      };
    case CREATE_PLAN:
      return {
        ...state,
        create_plan: action.payload || false,
      };
    case UPDATE_PLAN:
      return {
        ...state,
        update_plan: action.payload || false,
      };
    case DELETE_PLAN:
      return {
        ...state,
        delete_plan: action.payload || false,
      };
    case CREATE_POST:
      return {
        ...state,
        create_post: action.payload || false,
      };
    case UPDATE_POST:
      return {
        ...state,
        update_post: action.payload || false,
      };
    case DELETE_POST:
      return {
        ...state,
        delete_post: action.payload || false,
      };
    case LIKE:
      return {
        ...state,
        like: action.payload || false,
      };
    default:
      return state;
  }
}
