import React from "react";
import { Button, ConfigProvider } from "antd";

const Large_SubmitButton = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: props.bgColor,
          colorPrimaryHover: props.bgColor_hover,
        },
      }}
    >
      <Button
        type="primary"
        htmlType="submit"
        block={true}
        size="large"
        style={{ height: 50 }}
        onClick={props.onClick}
        {...props}
      >
        {props.name}
      </Button>
    </ConfigProvider>
  );
};
export default Large_SubmitButton;
