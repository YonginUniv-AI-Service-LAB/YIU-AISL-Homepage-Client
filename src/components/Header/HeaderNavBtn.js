import React, { Component } from "react";
import { Button, ConfigProvider } from "antd";

const HeaderNavBtn = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
        },
      }}
    >
      <Button
        size="large"
        type={props.type ? props.type : "text"}
        href={props.href}
        style={props.style}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </ConfigProvider>
  );
};

export default HeaderNavBtn;
