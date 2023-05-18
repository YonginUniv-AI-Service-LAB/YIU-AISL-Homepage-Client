import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  ConfigProvider,
  Space,
  Select,
  Alert,
  message,
} from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";
import Large_SubmitButton from "../../components/Button/Large_SubmitButton";
import Join_Input from "./Join_Input";

import styles from "./join.module.css";
import { colors } from "../../assets/colors";
import { questions } from "../../assets/string/question";
import ValidationRules from "../../utils/ValidationRules";

const Join = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const error = (data) => {
    console.log("왜 안되냐?", data);
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  const [valid, setValid] = useState({
    validId: true,
    validName: true,
    validEmail: true,
    validCertification: true,
    validPassword: true,
    validConfirmPassword: true,
  });

  const [form, setForm] = useState({
    name: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
        checkName: true,
      },
      valid: false,
    },
    email: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
        isEmail: true,
      },
      valid: false,
    },
    pwd1: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
        checkPassword: true,
      },
      valid: false,
    },
    pwd2: {
      value: "",
      type: "textInput",
      rules: {
        passwordConfirm: "pwd1",
      },
      valid: false,
    },
    question: {
      value: 0,
      type: "select",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    answer: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
        minLength: 2,
        maxLength: 4,
      },
      valid: false,
    },
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // 텍스트인풋 값 업데이트
  const updateInput = (e) => {
    console.log("name: ", e.target.id);
    console.log("value: ", e.target.value);
    if (e.target.value !== undefined || e.target.value != " ") {
      let formCopy = form;
      formCopy[e.target.id].value = e.target.value;
      let rules = formCopy[e.target.id].rules;
      let valid = ValidationRules(e.target.value, rules, formCopy);
      formCopy[e.target.id].valid = valid;
      console.log(valid);
      if (valid === true) setForm(formCopy);
      // this.setState({
      //   form: formCopy
      // })
      // if(name == 'password' && this.state.form.passwordConfirm.valid == true){
      //   this.setState({
      //     ...this.state,
      //     form: {
      //       ...this.state.form,
      //       passwordConfirm: {
      //         ...this.state.form.passwordConfirm,
      //         valid: false
      //       }
      //     }
      //   })
      // }
    } else {
      console.log("공백이지롱");
      error("공백은 입력할 수 없습니다");
    }
  };

  const checkFormValid = () => {
    for (let i in form) {
      let rules = form[i].rules;
      let valid = ValidationRules(form[i].value, rules, form);
      form[i].valid = valid;
      console.log(valid, form[i].valid);
    }
    // for문 => 현재 값 유효성 검사 => 유효성 통과하면 true, 불통과하면 false

    // let isFormValid = true;
    // let FORM = {};
    // const formCopy = form;

    // for (let key in formCopy) {
    //   console.log(key);
    //   isFormValid = isFormValid && formCopy[key].value;
    //   FORM[key] = formCopy[key].value;
    // }
    // console.log(isFormValid);
    // if (isFormValid) setForm(FORM);
    // else {
    //   error("조건에 맞는 값을 입력해주세요.");
    // }
  };

  // 폼 유효성 검사 확인 완료 => API요청
  const submitForm = () => {};

  return (
    <div>
      {contextHolder}
      <PageTitle title="Join" />
      <div className={styles.form_container}>
        <Form
          name="basic"
          colon={false}
          style={{
            minWidth: 500,
            maxWidth: 600,
          }}
          // initialValues={{
          //   remember: true,
          // }}
          onFinish={checkFormValid}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Join_Input
            label="Name"
            id="name"
            name="name"
            value={form.name}
            placeholder="Please input your name"
            icon={<UserOutlined style={{ marginRight: 5 }} />}
            rules={[
              // {
              //   validater: checkValid()
              // },
              {
                // required: true,
                // message: props.message,
              },
            ]}
            onChange={updateInput}
            minLength={2}
            maxLength={4}
          />

          <Form.Item
            label={<span className={styles.label}>Email</span>}
            name="email"
            rules={[
              {
                // required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ marginRight: 5 }} />}
              placeholder="Please input your email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={<span className={styles.label}>Password</span>}
            name="password1"
            rules={[
              {
                // required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined style={{ marginRight: 5 }} />}
              type="password"
              placeholder="Please input your password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={<span className={styles.label}>Password Confirm</span>}
            name="password2"
            rules={[
              {
                // required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined style={{ marginRight: 5 }} />}
              type="password"
              placeholder="Please re-enter your password"
              size="large"
            />
          </Form.Item>

          {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
          <Form.Item
            label={
              <span className={styles.label}>
                Identity verification question
              </span>
            }
            name="question"
          >
            <Select
              defaultValue="가장 인상깊게 읽은 책은?"
              options={questions}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<span className={styles.label}>Answer</span>}
            name="answer"
          >
            <Input
              required={true}
              placeholder="Please input your answer to the identity verification question."
              size="large"
            />
          </Form.Item>
          <br />
          <br />
          <br />
          <Form.Item>
            <Large_SubmitButton
              name="JOIN"
              bgColor={colors.yiu_dark_blue_light}
              bgColor_hover={colors.yiu_dark_blue}
              // onClick={submitForm}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Join;
