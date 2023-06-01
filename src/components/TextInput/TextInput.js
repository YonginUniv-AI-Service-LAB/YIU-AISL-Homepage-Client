import React from "react";
import { Button, Form, Input, ConfigProvider, Space, Select } from "antd";

import styles from "./textinput.module.css";
import { colors } from "../../assets/colors";
import { question } from "../../assets/string/question";

const TextInput = (props) => {
  return (
    <Form.Item
      label={<span className={styles.label}>{props.label}</span>}
      name={props.name}
      rules={props.rules}
    >
      {props.select === true ? (
        <Select
          id={props.id}
          value={props.value}
          defaultValue={props.defaultValue}
          options={props.options}
          size="large"
          onChange={props.onChange}
        />
      ) : (
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
      )}
    </Form.Item>
  );
};

export default TextInput;
