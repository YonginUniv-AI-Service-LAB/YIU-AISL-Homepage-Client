import React from "react";
import { useLocation } from "react-router-dom";
import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle/PageTitle";

const Members = () => {
  const location = useLocation();

  const items = [
    {
      key: 1,
      label: "Professors",
      children: "Professors",
    },
    {
      key: 2,
      label: "Students",
      children: "Students",
    },
  ];

  return (
    <div style={{ marginBottom: 100 }}>
      {console.log(location.state)}
      <PageTitle title="Members" />
      <Tabs
        defaultActiveKey={location.state === "professors" ? 1 : 2}
        // activeKey={location.state === "professors" ? 1 : 2}
        centered
        items={items}
        size="large"
        type="line"
        // onClick={(e) => console.log("e: ", e)}
      />
    </div>
  );
};

export default Members;
