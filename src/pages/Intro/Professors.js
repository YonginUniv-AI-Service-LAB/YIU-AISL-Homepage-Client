import React from "react";
import { Card, List, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { aisl_professors } from "../../assets/string/aisl_professors";

const { Meta } = Card;

const Professors = () => {
  return (
    <div style={{ marginBottom: 100 }}>
      <List
        grid={{
          gutter: 20,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        dataSource={aisl_professors}
        renderItem={(item) => (
          <List.Item style={{ display: "flex", alignItems: "center" }}>
            <Card
              hoverable
              style={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 30,
              }}
              cover={
                <Avatar shape="square" size={150} icon={<UserOutlined />} />
              }
            >
              <Meta
                title={`${item.name} 교수`}
                description={
                  <>
                    <p>{item.office}</p>
                    <p>{item.email}</p>
                  </>
                }
                style={{ textAlign: "center", fontSize: 15 }}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Professors;
