import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/main_actions";

import { Form, Row, Col, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";
import LoginInput from "./LoginInput";
import Large_SubmitButton from "../../components/Button/Large_SubmitButton";

import styles from "./login.module.css";
import { colors } from "../../assets/colors";
import ValidationRules from "../../utils/ValidationRules";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginResult = useSelector((state) => state.Main.login);
  const [messageApi, contextHolder] = message.useMessage();

  // 에러메세지 함수
  const errorMsg = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  // 로그인 폼
  const [form, setForm] = useState({
    email: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
        isEmail: true,
      },
      valid: false,
    },
    pwd: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
        checkPassword: true,
      },
      valid: false,
    },
  });

  // 텍스트인풋 업데이트
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: {
        ...prevState[e.target.id],
        value: e.target.value,
      },
    }));
  };

  // 유효성 검사
  const checkFormValid = () => {
    let checkValid = true;
    let falseForm = [];

    for (let i in form) {
      let rules = form[i].rules;
      let valid = ValidationRules(form[i].value, rules, form);
      form[i].valid = valid;
      if (form[i].valid === false || form[i].value === "") {
        checkValid = false;
        falseForm.push(i);
      }
    }

    if (checkValid) submitForm();
    else {
      errorMsg("이메일과 비밀번호를 모두 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 => API요청
  const submitForm = () => {
    dispatch(login(form))
      .then((res) => {
        console.log("res: ", res);
        switch (res.payload) {
          case true:
            // navigate("/");
            break;
          case 400:
            errorMsg(`입력한 이메일과 비밀번호를 확인해주세요!`);
            break;
          case 401:
            errorMsg(`이메일과 비밀번호가 일치하지 않습니다!`);
            break;
          case 500:
            errorMsg(`관리자에게 문의해주세요.`);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
  };

  return (
    <div>
      {contextHolder}
      <PageTitle title="Login" />
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
          autoComplete="off"
          layout="vertical"
          onFinish={checkFormValid}
        >
          <LoginInput
            id="email"
            name="email"
            value={form.email.value}
            placeholder="이메일 입력"
            onChange={(e) => {
              onChange(e);
            }}
            icon={<MailOutlined style={{ marginRight: 5 }} />}
            minLength={4}
            maxLength={320}
          />

          <LoginInput
            id="pwd"
            name="pwd"
            value={form.pwd.value}
            placeholder="비밀번호 입력"
            onChange={(e) => {
              onChange(e);
            }}
            icon={<LockOutlined style={{ marginRight: 5 }} />}
            minLength={8}
            maxLength={20}
            type={"password"}
          />

          <Form.Item>
            <Row>
              <Col span={12}>
                <a href="./join" className={styles.subBtn}>
                  회원가입
                </a>
                {/* <Button type="link">회원가입</Button> */}
              </Col>
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <a href="./forgotemail" className={styles.subBtn}>
                  이메일 찾기
                </a>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a href="./forgotpassword" className={styles.subBtn}>
                  비밀번호 찾기
                </a>
              </Col>
            </Row>
          </Form.Item>
          <br />
          <br />
          <br />

          <Form.Item>
            <Large_SubmitButton
              name="로그인"
              bgColor={colors.yiu_dark_blue_light}
              bgColor_hover={colors.yiu_dark_blue}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
