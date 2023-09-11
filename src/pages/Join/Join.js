import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Form, message } from "antd";

// 리덕스 사용
import { useDispatch, useSelector } from "react-redux";
import { join } from "../../store/actions/main_actions";

import PageTitle from "../../components/PageTitle/PageTitle";
import Large_SubmitButton from "../../components/Button/Large_SubmitButton";
import JoinInput from "./JoinInput";
import JoinComplete from "./JoinComplete";

import styles from "./join.module.css";
import { colors } from "../../assets/colors";
import { questions } from "../../assets/string/question";
import ValidationRules from "../../utils/ValidationRules";

const Join = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinResult = useSelector((state) => state.Main.join);

  const [emailCheck, setEmailCheck] = useState(true);
  const [pageChange, setPageChange] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  // 에러메세지 함수
  const errorMsg = (data) => {
    console.log("왜 안되냐?", data);
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  // 회원가입 폼
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
      console.log(i, form[i].value);
      let rules = form[i].rules;
      let valid = ValidationRules(form[i].value, rules, form);
      form[i].valid = valid;
      console.log("=====", form[i].valid, "=====");
      if (form[i].valid === false || form[i].value === "") {
        checkValid = false;
        falseForm.push(i);
      }
    }

    console.log("checkValid: ", checkValid);
    console.log("falseForm: ", falseForm);

    if (checkValid === true) submitForm();
    else {
      errorMsg("조건에 맞는 값을 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 => API요청
  const submitForm = () => {
    console.log("통과");
    dispatch(join(form))
      .then((res) => {
        console.log("res: ", res);
        switch (res.payload) {
          case true:
            setPageChange(true);
            break;
          case 400:
            errorMsg(`입력되지 않은 값이 있습니다!`);
            break;
          case 409:
            errorMsg(`이미 가입한 이메일입니다.`);
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
      <PageTitle title="Join" />
      {pageChange === false ? (
        <JoinComplete onClick={() => navigate("/login", { replace: true })} />
      ) : (
        <div>
          <Form
            name="basic"
            colon={false}
            style={{
              minWidth: isMobile ? 350 : 500,
              maxWidth: isMobile ? 400 : 600,
            }}
            autoComplete="off"
            layout="vertical"
            onFinish={checkFormValid}
          >
            <JoinInput
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

            <JoinInput
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

            <JoinInput
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

            <JoinInput
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

            <JoinInput
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

            <JoinInput
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
                name="회원가입"
                bgColor={colors.yiu_dark_blue_light}
                bgColor_hover={colors.yiu_dark_blue}
              />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Join;
