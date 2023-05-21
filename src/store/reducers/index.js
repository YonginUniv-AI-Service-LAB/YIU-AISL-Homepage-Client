import { combineReducers } from "redux";

import Main from "./main_reducer";
import User from "./user_reducer";
import Notice from "./notice_reducer";
import Community from "./community_reducer";

const rootReducer = combineReducers({
  Main,
  User,
  Notice,
  Community,
});

export default rootReducer;
