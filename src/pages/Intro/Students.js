import React from "react";
import { Card, List, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  aisl_students1,
  aisl_students2,
} from "../../assets/string/aisl_students";
import 정민기 from "../../assets/images/students/정민기_oon418@naver.com.jpg";
import styles from "./intro.module.css";

const { Meta } = Card;

const Students = () => {
  return (
    <div style={{ marginBottom: 100 }} className={styles.container}>
      <List
        grid={{
          gutter: 15,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        dataSource={aisl_students1}
        renderItem={(item) => (
          <List.Item className="ant-row-flex">
            <Card
              hoverable
              style={{
                width: 350,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 20,
              }}
              cover={
                <Avatar
                  shape="circle"
                  size={250}
                  icon={<UserOutlined />}
                  style={{
                    // backgroundColor: color,
                    verticalAlign: "middle",
                    objectFit: "fill",
                  }}
                  src={item.img}
                />
              }
            >
              <Meta
                title={item.name}
                description={
                  <>
                    <p>{item.office}</p>
                    <p>{item.email}</p>
                  </>
                }
                style={{ textAlign: "center" }}
              />
            </Card>
          </List.Item>
        )}
      />
      <List
        grid={{
          gutter: 15,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        dataSource={aisl_students2}
        renderItem={(item) => (
          <List.Item className="ant-row-flex">
            <Card
              hoverable
              style={{
                width: 350,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 20,
              }}
              cover={
                <Avatar
                  shape="circle"
                  size={250}
                  icon={<UserOutlined />}
                  src={item.img}
                />
              }
            >
              <Meta
                title={item.name}
                description={
                  <>
                    <p>{item.office}</p>
                    <p>{item.email}</p>
                  </>
                }
                style={{ textAlign: "center" }}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Students;
