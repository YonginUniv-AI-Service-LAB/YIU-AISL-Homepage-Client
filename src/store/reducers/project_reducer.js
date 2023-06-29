import {
  GET_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PROJECT:
      console.log("리듀서: ", action.payload);
      return {
        ...state,
        project: action.payload || [],
      };
    case CREATE_PROJECT:
      return {
        ...state,
        create_project: action.payload || false,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        update_project: action.payload || false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        delete_project: action.payload || false,
      };
    default:
      return state;
  }
}
