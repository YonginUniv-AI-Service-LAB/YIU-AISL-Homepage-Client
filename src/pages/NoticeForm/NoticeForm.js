import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const navigate = useNavigate();

  // textArea 사용하기 위한 선언
  const { TextArea } = Input;

  // 공지사항 폼
  const [form, setForm] = useState({
    noticeid: {
      value:
        location.state.type === "update" ? location.state.data.noticeid : 0,
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
  });

  const ResCreate = useSelector((state) => state.Notice.create_notice);
  const ResUpdate = useSelector((state) => state.Notice.update_notice);

  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    console.log("이미지 변환 결과: ", new File([data], filename, metadata));
    let file = new File([data], filename, metadata);
    let arr = [];
    arr.push(file);
    let result = { file, fileList: arr };
    setImgFile(file);
    handleChange(result);
    return new File([data], filename, metadata);
  };

  useEffect(() => {
    console.log("받은 데이터: ", location.state.data);
    if (location.state.type === "update") {
      console.log("받은 이미지 url: ", location.state.data.img);
      convertURLtoFile(location.state.data.img);
    }
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imgFile, setImgFile] = useState();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
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

  const convertImageToFile = (image, fileName) => {
    console.log("이걸 바꿀거야: ", image, fileName);
    const file = new File([image], fileName, { type: image.type });
    return file;
  };

  // 유효성 검사 확인 완료 =>  API요청
  const submitForm = () => {
    console.log(location.state.type);
    let status = false;
    switch (location.state.type) {
      case "create":
        dispatch(createNotice(form, imgFile))
          .then((res) => {
            if (res.payload === true) {
              status = true;
              completeMsg("공지사항이 생성되었습니다!");
              navigate("/notice", { replace: true });
              // navigate("/notice/detail", { replace: true, state: ResCreate });
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      case "update":
        dispatch(updateNotice(form, imgFile))
          .then((res) => {
            if (res.payload === true) {
              status = true;
              completeMsg("공지사항이 수정되었습니다!");
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
          location.state.type === "create" ? "공지사항 작성" : "공지사항 수정"
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
            name="img"
            label={<span className={styles.label}>Upload</span>}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="이미지 파일만 업로드 가능"
          >
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={() => false}
              beforeUpload={(file) => {
                setImgFile(file);
                return false; // 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
              }}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={() => setImgFile()}
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
export default NoticeForm;
