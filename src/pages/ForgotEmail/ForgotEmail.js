import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Button, Form, Input, ConfigProvider, Select, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

// import ChangePassword from './ChangePassword'
import PageTitle from "../../components/PageTitle/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  findPwd,
  changePwd,
  findEmail,
} from "../../store/actions/user_actions";
import styles from "./forgotemail.module.css";
import { colors } from "../../assets/colors";
import { questions } from "../../assets/string/question";
import ValidationRules from "../../utils/ValidationRules";
import TextInput from "../../components/TextInput/TextInput";
import Large_SubmitButton from "../../components/Button/Large_SubmitButton";

const ForgotEmail = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const [messageApi, contextHolder] = message.useMessage();

  const [complete, setComplete] = useState(false);
  const [email, setEmail] = useState("");

  // const FEResult = useSelector((state) => state.User.findemail);

  const errorMsg = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  const completeMsg = (data) => {
    messageApi.open({
      type: "success",
      content: data,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    question: {
      value: 1,
      type: "select",
      rules: {
        isRequired: true,
      },
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
    const nextForm = {
      ...form,
      question: {
        ...["question"],
        value: data,
      },
    };
    setForm(nextForm);
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
      errorMsg("조건에 맞는 값을 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 => API요청
  const submitForm = () => {
    dispatch(findEmail(form))
      .then((res) => {
        if (res.payload.result === true) {
          setEmail(res.payload.email);
          setComplete(true);
        } else {
          switch (res.payload) {
            case 400:
              errorMsg(`입력하신 정보를 확인해주세요.`);
              break;
            case 401:
              errorMsg(`회원정보가 일치하지 않습니다.`);
              break;
            case 500:
              errorMsg(`관리자에게 문의해주세요.`);
            default:
              break;
          }
        }
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
  };

  return (
    <div>
      {contextHolder}
      <PageTitle title="이메일 찾기" />
      <div className={styles.form_container}>
        <Form
          name="basic"
          colon={false}
          style={{
            minWidth: isMobile ? 350 : 500,
            maxWidth: isMobile ? 400 : 600,
          }}
          onFinish={checkFormValid}
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
            disabled={complete === true ? true : false}
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
            disabled={complete === true ? true : false}
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
            disabled={complete === true ? true : false}
          />

          <Form.Item>
            {complete === true ? (
              <div>
                <h3
                  style={{
                    textAlign: "center",
                    backgroundColor: colors.grey_light2,
                    padding: 40,
                    borderRadius: 8,
                  }}
                >
                  회원님의 이메일은
                  <h2>{email}</h2>
                  입니다.
                </h3>
                <br />
                <Large_SubmitButton
                  name="로그인 화면으로 이동"
                  bgColor={colors.yiu_dark_blue_light}
                  bgColor_hover={colors.yiu_dark_blue}
                  onClick={() => navigate("/login")}
                />
              </div>
            ) : (
              <>
                <br />
                <br />
                <br />
                <Large_SubmitButton
                  name="이메일 찾기"
                  bgColor={colors.yiu_dark_blue_light}
                  bgColor_hover={colors.yiu_dark_blue}
                />
              </>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotEmail;
