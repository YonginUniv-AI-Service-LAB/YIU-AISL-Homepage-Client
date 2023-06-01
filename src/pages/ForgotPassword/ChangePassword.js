import React, { useState } from "react";
import { Button, Form, Input, ConfigProvider, Select, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch } from "react-redux";
import { findPwd, changePwd } from "../../store/actions/user_actions";
import styles from "./forgotpassword.module.css";
import { colors } from "../../assets/colors";
import { questions } from "../../assets/string/question";
import ValidationRules from "../../utils/ValidationRules";
import TextInput from "../../components/TextInput/TextInput";
import Large_SubmitButton from "../../components/Button/Large_SubmitButton";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ChangePassword = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const error = (data) => {
    console.log("왜 안되냐?", data);
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  const complete = (data) => {
    messageApi.open({
      type: "비밀번호가 변경 되었습니다.",
      content: data,
    });
  };

  const dispatch = useDispatch();

  // 폼
  const [form, setForm] = useState({
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
  });

  // 텍스트인풋 업데이트
  const onChange = (e) => {
    console.log("===============================");
    console.log(e.target.id, e.target.value);

    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: {
        ...prevState[e.target.id],
        value: e.target.value,
      },
    }));
  };

  // 텍스트인풋-셀렉트(question) 업데이트
  const onChangeSelect = (data) => {
    console.log(data);
    const nextForm = {
      ...form,
      question: {
        ...["question"],
        value: data,
      },
    };
    setForm(nextForm);

    console.log(form.question);
  };

  // 유효성 검사
  const checkFormValid = () => {
    let checkValid = true;
    let falseForm = [];

    for (let i in form) {
      console.log("=====", i, form[i].value, "=====");
      console.log("rules: ", form[i].rules);
      let rules = form[i].rules;
      let valid = ValidationRules(form[i].value, rules, form);
      form[i].valid = valid;
      console.log("valid: ", form[i].valid);
      if (form[i].valid === false || form[i].value === "") {
        checkValid = false;
        falseForm.push(i);
      }
    }
    console.log("checkValid: ", checkValid);
    console.log("falseForm: ", falseForm);

    if (checkValid) submitForm();
    else {
      error("조건에 맞게 입력 해주세요.");
    }
  };

  // 유효성 검사 확인 완료 => API요청
  const submitForm = () => {
    console.log("비밀 번호를 변경 하겠습니다.");
    let result = dispatch(findPwd(form));
    if (result.payload === 200) complete("비밀 번호 변경!!");
    else if (result.payload === 401)
      complete("비밀 번호를 다시 입력해주세요 ㅜㅜ");
    else error("잠시 후에 다시 시도해주세요");
  };

  return (
    <div>
      {contextHolder}
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
          // onFinish={onFinish}
          onFinish={() => checkFormValid()}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <TextInput
            label="Password"
            id="pwd1"
            name="pwd1"
            value={form.pwd1.value}
            placeholder="영어+문자+숫자 포함 8~20자"
            onChange={(e) => {
              onChange(e);
            }}
            minLength={8}
            maxLength={20}
            type="password"
          />

          <TextInput
            label="Password Confirm"
            id="pwd2"
            name="pwd2"
            value={form.pwd2.value}
            placeholder="비밀번호 재입력"
            onChange={(e) => {
              onChange(e);
            }}
            minLength={8}
            maxLength={20}
            type="password"
          />

          <br />
          <br />
          <br />

          <Form.Item>
            <Large_SubmitButton
              name="비밀번호 변경"
              bgColor={colors.yiu_dark_blue_light}
              bgColor_hover={colors.yiu_dark_blue}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
