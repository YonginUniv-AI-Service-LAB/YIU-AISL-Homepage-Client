import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  updateProject,
} from "../../store/actions/project_actions";
import { useLocation } from "react-router-dom";

import { Form, Input, message } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";
import Large_SubmitButton from "../../components/Button/Large_SubmitButton";

import styles from "./projectform.module.css";
import { colors } from "../../assets/colors";
import ValidationRules from "../../utils/ValidationRules";

const ProjectForm = () => {
  // 프로젝트 목록 페이지로부터 받은 데이터
  // create => 프로젝트 생성 / update => 프로젝트 수정
  const location = useLocation();
  const navigate = useNavigate();

  // textArea 사용하기 위한 선언
  const { TextArea } = Input;

  // 프로젝트 폼
  const [form, setForm] = useState({
    projectid: {
      value:
        location.state.type === "update" ? location.state.data.projectid : 0,
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
    title: {
      value: location.state.type === "update" ? location.state.data.title : "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    contents: {
      value:
        location.state.type === "update" ? location.state.data.contents : "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    link: {
      value: location.state.type === "update" ? location.state.data.link : "",
      type: "textInput",
      // rules: {
      //   isRequired: true,
      // },
      valid: false,
    },
  });

  const ResCreate = useSelector((state) => state.Project.create_project);
  const ResUpdate = useSelector((state) => state.Project.update_project);

  useEffect(() => {
    console.log("받은 데이터: ", location.state.data);
  }, []);

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  // 에러메세지 함수
  const errorMsg = (data) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  // 완료메세지 함수
  const completeMsg = (data) => {
    messageApi.open({
      type: "success",
      content: data,
    });
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
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

    if (checkValid) {
      submitForm();
    } else {
      errorMsg("제목과 내용을 모두 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 =>  API요청
  const submitForm = () => {
    console.log(location.state.type);
    let status = false;
    switch (location.state.type) {
      case "create":
        dispatch(createProject(form))
          .then((res) => {
            if (res.payload === true) {
              status = true;
              completeMsg("프로젝트가 생성되었습니다!");
              navigate("/project", { replace: true });
              // navigate("/project/detail", { replace: true, state: ResCreate });
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      case "update":
        dispatch(updateProject(form))
          .then((res) => {
            if (res.payload === true) {
              status = true;
              completeMsg("프로젝트가 수정되었습니다!");
              navigate("/notice", { replace: true });
              // navigate(-1, {
              //   replace: true,
              //   state: form.noticeid.value,
              // });
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      default:
        break;
    }
  };

  const ResFunc = (res) => {
    switch (res) {
      case 400:
        errorMsg("입력한 값을 확인해주세요.");
        break;
      case 403:
        errorMsg("접근 권한이 없습니다.");
        break;
      case 404:
        errorMsg("이미 삭제된 일정입니다.");
        break;
      case 500:
        errorMsg("관리자에게 문의해주세요.");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {contextHolder}
      <PageTitle
        title={
          location.state.type === "create" ? "프로젝트 생성" : "프로젝트 수정"
        }
      />
      <div className={styles.form_container}>
        <Form
          name="basic"
          colon={false}
          style={{
            minWidth: 700,
            maxWidth: 800,
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={checkFormValid}
        >
          <Form.Item
            label={<span className={styles.label}>Title</span>}
            name="title"
          >
            <Input
              id="title"
              value={form.title.value}
              defaultValue={form.title.value}
              placeholder={"제목 입력"}
              size="large"
              onChange={onChange}
              maxLength={100}
            />
          </Form.Item>

          <Form.Item
            label={<span className={styles.label}>Contents</span>}
            name="contents"
          >
            <TextArea
              id="contents"
              value={form.contents.value}
              defaultValue={form.contents.value}
              placeholder={"내용 입력"}
              onChange={onChange}
              style={{ resize: "none" }}
              rows={20}
            />
          </Form.Item>

          <Form.Item
            label={<span className={styles.label}>Link</span>}
            name="title"
          >
            <Input
              id="link"
              value={form.link.value}
              defaultValue={form.link.value}
              placeholder={"링크 입력"}
              size="large"
              onChange={onChange}
              maxLength={100}
            />
          </Form.Item>

          <br />
          <br />
          <br />

          <Form.Item>
            <Large_SubmitButton
              name={location.state.type === "create" ? "완료" : "수정"}
              bgColor={colors.yiu_dark_blue_light}
              bgColor_hover={colors.yiu_dark_blue}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ProjectForm;
