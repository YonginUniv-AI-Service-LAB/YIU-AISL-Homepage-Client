import React from "react";
import { Button, Form, Input, ConfigProvider, Space, Select } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./join.module.css";
import { colors } from "../../assets/colors";
import { question } from "../../assets/string/question";

const Join_Input = (props) => {
  return (
    <Form.Item
      label={<span className={styles.label}>{props.label}</span>}
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
      />
    </Form.Item>
  );
};

export default Join_Input;
