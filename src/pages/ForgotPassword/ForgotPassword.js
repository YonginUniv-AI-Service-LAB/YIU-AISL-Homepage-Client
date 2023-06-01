import React, { useState } from "react";
import { Button, Form, Input, ConfigProvider, Select, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

import ChangePassword from "./ChangePassword";
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

const ForgotPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [complete, setComplete] = useState(false);

  const error = (data) => {
    console.log("왜 안되냐?", data);
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  const dispatch = useDispatch();

  // 폼
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
    question: {
      value: 1,
      type: "select",
      // rules: {
      //   isRequired: true,
      // },
      valid: true,
    },
    answer: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
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
      error("조건에 맞는 값을 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 => API요청
  const submitForm = () => {
    console.log("통과");
    let result = dispatch(findPwd(form));
    if (result.payload === 200) setComplete(true);
    else if (result.payload === 401)
      complete("회원 정보를 다시 입력해 주세요ㅜㅜ");
    else error("잠시 후에 다시 시도해주세요");
  };

  return (
    <div>
      {contextHolder}
      <PageTitle title="비밀번호 변경하기" />
      {complete === false ? (
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
              label="Name"
              id="name"
              name="name"
              value={form.name.value}
              placeholder="2~4자 이름 입력    예) 홍길동"
              onChange={(e) => {
                onChange(e);
              }}
              minLength={2}
              maxLength={4}
            />

            <TextInput
              label="Email"
              id="email"
              name="email"
              value={form.email.value}
              placeholder="이메일 입력    예) abc@naver.com"
              onChange={(e) => {
                onChange(e);
              }}
              minLength={4}
              maxLength={320}
            />

            <TextInput
              select={true}
              label="Identity verification question"
              id="question"
              name="question"
              options={questions}
              value={form.question.value}
              defaultValue={questions[0]}
              onChange={(e) => {
                onChangeSelect(e);
              }}
            />

            <TextInput
              label="Answer"
              id="answer"
              name="answer"
              value={form.answer.value}
              placeholder="질문에 대한 답변 입력"
              onChange={(e) => {
                onChange(e);
              }}
              minLength={1}
              maxLength={100}
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
      ) : (
        <ChangePassword />
      )}
    </div>
  );
};

export default ForgotPassword;
