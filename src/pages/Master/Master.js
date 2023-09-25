import React from "react";
import { useLocation } from "react-router-dom";
import { Tabs } from "antd";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  enterUser,
  refuseUser,
} from "../../store/actions/user_actions";

import PageTitle from "../../components/PageTitle/PageTitle";
import WaitingUsers from "./WaitingUsers";
import Users from "./Users";

import { colors } from "../../assets/colors";

const Master = () => {
  const location = useLocation();

  // 리덕스
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.User.get_all_user);

  const items = [
    {
      key: 1,
      label: <h2>Waiting</h2>,
      children: <WaitingUsers />,
    },
    {
      key: 2,
      label: <h2>All</h2>,
      children: <Users />,
    },
  ];

  return (
    <div style={{ marginBottom: 100 }}>
      <PageTitle title="Master" />
      <Tabs
        defaultActiveKey={1}
        // activeKey={location.state === "professors" ? 1 : 2}
        centered
        items={items}
        size="large"
        type="line"
        tabBarGutter={100}
        // onClick={(e) => console.log("e: ", e)}
      ></Tabs>
    </div>
  );
};

export default Master;
