import React from "react";
import { useLocation } from "react-router-dom";
import { Tabs } from "antd";

import PageTitle from "../../components/PageTitle/PageTitle";
import Professors from "./Professors";
import Students from "./Students";

import { colors } from "../../assets/colors";

const People = () => {
  const location = useLocation();

  const items = [
    {
      key: 1,
      label: <h2>Professors</h2>,
      children: <Professors />,
    },
    {
      key: 2,
      label: <h2>Students</h2>,
      children: <Students />,
    },
  ];

  return (
    <div style={{ marginBottom: 100 }}>
      {console.log(location.state)}
      <PageTitle title="People" />
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

export default People;
