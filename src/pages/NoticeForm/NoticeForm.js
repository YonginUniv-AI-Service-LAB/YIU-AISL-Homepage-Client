import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNotice, updateNotice } from "../../store/actions/notice_actions";
import { useLocation } from "react-router-dom";

import { Form, Input, Upload, message, Modal } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import PageTitle from "../../components/PageTitle/PageTitle";
import Large_SubmitButton from "../../components/Button/Large_SubmitButton";

import styles from "./noticeform.module.css";
import { colors } from "../../assets/colors";
import ValidationRules from "../../utils/ValidationRules";

const NoticeForm = () => {
  // 공지사항 목록 페이지로부터 받은 데이터
  // create => 공지사항 생성 / update => 공지사항 수정
  const location = useLocation();

  // textArea 사용하기 위한 선언
  const { TextArea } = Input;

  // 공지사항 폼
  const [form, setForm] = useState({
    title: {
      value: location.state.type === "Update" ? location.state.data.title : "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    contents: {
      value:
        location.state.type === "Update" ? location.state.data.contents : "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
  });

  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}`, uid: -1 };
    console.log("data: ", [data]);
    return new File([data], filename, metadata);
  };

  useEffect(() => {
    if (location.state.type === "Update") {
      const result = convertURLtoFile(location.state.data.img);
      console.log("이미지 변환 결과: ", result);
      // handleChange({
      //   fileList: result,
      // });
    }
    // console.log("데이터: ", location.state.data.img);
    // setForm((prevState) => ({
    //   ...prevState,
    //   title: {
    //     ...prevState.title,
    //     value: location.state.data.title,
    //   },
    //   contents: {
    //     ...prevState.contents,
    //     value: location.state.data.contents,
    //   },
    // }));
  }, []);

  // 이미지
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  // 에러메세지 함수
  const error = (data) => {
    console.log("왜 안되냐?", data);
    messageApi.open({
      type: "error",
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-2",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log("preview file: ", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    console.log("newFileList: ", newFileList);
    setFileList(newFileList);
    console.log("fileList: ", fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // 이미지
  // const [fileList, setFileList] = useState([
  //   {
  //     uid: "-1",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  // ]);

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
      if (location.state.type === "Create") submitCreateForm();
      else if (location.state.type === "Update") submitUpdateForm();
      else submitCreateForm();
    } else {
      error("조건에 맞는 값을 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 => 공지사항 생성 API요청
  const submitCreateForm = () => {
    console.log("통과");
    dispatch(createNotice(form, fileList[0]));
  };

  // 유효성 검사 확인 완료 => 공지사항 수정 API요청
  const submitUpdateForm = () => {
    console.log("통과");
    dispatch(createNotice(form, fileList[0]));
  };

  return (
    <div>
      {contextHolder}
      <PageTitle title={`${location.state.type} Notice`} />
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
            name="img"
            label={<span className={styles.label}>Upload</span>}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="이미지 파일만 업로드 가능"
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              maxCount={1}
              accept="image/jpg, image/png, image/jpeg"
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>

          <br />
          <br />
          <br />

          <Form.Item>
            <Large_SubmitButton
              name={location.state.type === "Create" ? "COMPLETE" : "UPDATE"}
              bgColor={colors.yiu_dark_blue_light}
              bgColor_hover={colors.yiu_dark_blue}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default NoticeForm;
