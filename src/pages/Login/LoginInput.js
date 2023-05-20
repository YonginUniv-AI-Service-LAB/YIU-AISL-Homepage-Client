import React from "react";
import { Button, Form, Input, ConfigProvider, Space, Select } from "antd";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./login.module.css";
import { colors } from "../../assets/colors";

const LoginInput = (props) => {
  return (
    <Form.Item
      // label={<span className={styles.label}>{props.label}</span>}
      name={props.name}
      rules={props.rules}
    >
      <Input
        id={props.id}
        prefix={props.icon}
        value={props.value}
        placeholder={props.placeholder}
        size="large"
        onChange={props.onChange}
        maxLength={props.maxLength}
        type={props.type}
      />
    </Form.Item>
  );
};

export default LoginInput;
