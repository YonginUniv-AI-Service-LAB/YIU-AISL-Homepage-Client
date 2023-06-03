import React, { useState } from "react";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunity,
  createPost,
  updatePost,
  deletePost,
  like,
} from "../../store/actions/community_actions";

import {
  Card,
  Space,
  Row,
  Col,
  Button,
  List,
  Dropdown,
  Modal,
  Popconfirm,
  Form,
  Input,
  message,
} from "antd";
import VirtualList from "rc-virtual-list";
import { MoreOutlined, LikeOutlined, PlusOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import styles from "./community.module.css";
import { colors } from "../../assets/colors";
import ValidationRules from "../../utils/ValidationRules";

// 섹션 높이 지정
const ContainerHeight = 400;

const CommunityPost = (props) => {
  const dispatch = useDispatch();

  const { TextArea } = Input;
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

  // 게시글 편집 버튼(수정, 삭제)
  const items = [
    {
      key: "1",
      label: (
        <Button
          type="link"
          block={true}
          onClick={() => {
            setType("update");
            showModal();
          }}
        >
          게시글 수정
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          type="link"
          block={true}
          onClick={() => {
            setType("delete");
            showModal();
          }}
        >
          게시글 삭제
        </Button>
      ),
    },
  ];

  const [type, setType] = useState("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(() => dayjs(new Date()));

  // Post 폼
  const [form, setForm] = useState({
    postid: {
      value: 0,
      type: "textInput",
      rules: {
        // isRequired: true,
      },
      valid: false,
    },
    writer: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
    contents: {
      value: "",
      type: "textInput",
      rules: {
        isRequired: true,
      },
      valid: false,
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 버튼 클릭에 따른 데이터 세팅
  const setData = (data) => {
    if (data) {
      setForm((prevState) => ({
        ...prevState,
        postid: {
          ...prevState.postid,
          value: data.postid,
        },
        writer: {
          ...prevState.date,
          value: data.writer,
        },
        contents: {
          ...prevState.contents,
          value: data.contents,
        },
      }));
      console.log("form: ", form);
      showModal();
    } else {
      setForm((prevState) => ({
        ...prevState,
        postid: {
          ...prevState.postid,
          value: 0,
        },
        writer: {
          ...prevState.date,
          value: "",
        },
        contents: {
          ...prevState.contents,
          value: "",
        },
      }));
      console.log("form: ", form);
      showModal();
    }
  };

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

    if (type === "create") {
      let rules = form["contents"].rules;
      let valid = ValidationRules(form["contents"].value, rules, form);
      form["contents"].valid = valid;
      console.log("valid: ", form["contents"].valid);
      if (form["contents"].valid === false || form["contents"].value === "") {
        checkValid = false;
      }
    } else {
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
    }

    console.log("checkValid: ", checkValid);
    console.log("falseForm: ", falseForm);

    if (checkValid) {
      submitForm();
    } else {
      errorMsg("조건에 맞는 값을 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 =>  API요청
  const submitForm = () => {
    console.log(type);
    switch (type) {
      case "create":
        dispatch(createPost(form))
          .then((res) => {
            if (res.payload === true) {
              completeMsg("게시글이 생성되었습니다!");
              setIsModalOpen(false);
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      case "update":
        dispatch(updatePost(form))
          .then((res) => {
            if (res.payload === true) {
              completeMsg("게시글이 수정되었습니다!");
              setIsModalOpen(false);
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      case "delete":
        dispatch(deletePost(form.postid.value))
          .then((res) => {
            if (res.payload === true) {
              completeMsg("게시글이 삭제되었습니다!");
              setIsModalOpen(false);
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      default:
        break;
    }
    dispatch(getCommunity());
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
        errorMsg("이미 삭제된 게시글입니다.");
        break;
      case 500:
        errorMsg("관리자에게 문의해주세요.");
        break;
      default:
        break;
    }
  };

  const clickLikeBtn = (data) => {
    dispatch(like(data))
      .then((res) => {
        if (res.payload === 201) {
          completeMsg("게시글에 공감했습니다.");
        } else if (res.payload === 204) {
          completeMsg("게시글 공감을 취소했습니다.");
        } else ResFunc(res.payload);
      })
      .catch((err) => {
        errorMsg(`잠시 후에 다시 시도해주세요.`);
      });
    dispatch(getCommunity());
  };

  return (
    <div>
      {contextHolder}
      {/* 섹션 타이틀 */}
      <Row align={"middle"}>
        <Col span={8}>
          <h1 className={styles.section_title}>Post</h1>
        </Col>
        <Col span={7} offset={9}>
          {sessionStorage.getItem("userid") ? (
            <Button
              color="#868e96"
              icon={<PlusOutlined />}
              onClick={() => {
                setData();
                setType("create");
                showModal();
              }}
            />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col span={19}>
          <Card>
            {props.no == true ? (
              <h3 style={{ textAlign: "center" }}>글이 없습니다</h3>
            ) : (
              <VirtualList
                data={props.data}
                height={ContainerHeight}
                itemHeight={0}
                itemKey="key"
              >
                {(item) =>
                  props.date == item.createdAt.substring(0, 10) ? (
                    <List.Item key={item.key} className={styles.post_container}>
                      <Row align={"middle"} justify={"space-between"}>
                        <Col>
                          <div style={{ padding: 10 }}>
                            <h4>{item.writer}</h4>
                            <p style={{ fontWeight: "bold" }}>
                              {item.contents}
                            </p>
                          </div>
                        </Col>
                        <Col>
                          {sessionStorage.getItem("name") == item.writer ? (
                            <Dropdown
                              menu={{
                                onClick: () => setData(item),
                                items,
                              }}
                              placement="bottom"
                            >
                              <Button
                                className={styles.community_btn}
                                type="text"
                                icon={<MoreOutlined />}
                                style={{ textAlign: "center" }}
                              ></Button>
                            </Dropdown>
                          ) : null}
                        </Col>
                        {/* <h3 style={{}}>⦁ {item.contents}</h3> */}
                      </Row>
                      {sessionStorage.getItem("userid") ? (
                        <Button
                          // disabled={true}
                          type="text"
                          icon={<LikeOutlined />}
                          className={styles.like_btn}
                          block={true}
                          onClick={() => clickLikeBtn(item.postid)}
                        >
                          &nbsp;
                          {item.likers.length}
                          {/* {item.likers.length > 0 ? item.likers.length : null} */}
                        </Button>
                      ) : (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                          className={styles.like_btn}
                        >
                          <LikeOutlined />
                          &nbsp;
                          <span>{item.likers.length}</span>
                        </div>
                      )}
                    </List.Item>
                  ) : (
                    <></>
                  )
                }
              </VirtualList>
            )}
          </Card>
        </Col>
      </Row>

      {/* 모달 */}
      <Modal
        title={
          type === "create"
            ? "게시글 작성"
            : type === "update"
            ? "게시글 수정"
            : "게시글 삭제"
        }
        open={isModalOpen}
        okText={
          type === "create" ? "작성" : type === "update" ? "수정" : "삭제"
        }
        cancelText={"취소"}
        onOk={() => (type === "delete" ? submitForm() : checkFormValid())}
        onCancel={() => setIsModalOpen(false)}
      >
        <div>
          <Form
            name="basic"
            colon={false}
            autoComplete="off"
            layout="vertical"
            // onFinish={checkFormValid}
          >
            <h3 style={{ textAlign: "center" }}>
              {dayjs(new Date()).format("YYYY-MM-DD")}
            </h3>
            <h3 style={{ textAlign: "center" }}>{form.writer.value}</h3>

            {type === "delete" ? (
              <p
                style={{
                  fontWeight: "bold",
                  backgroundColor: colors.post_bg,
                  padding: 10,
                  borderRadius: 7,
                }}
              >
                {form.contents.value}
              </p>
            ) : (
              <TextArea
                id="contents"
                value={form.contents.value}
                defaultValue={form.contents.value}
                placeholder={"내용 입력"}
                onChange={onChange}
                style={{ resize: "none" }}
                rows={10}
              />
            )}
            <br />
            <br />
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default CommunityPost;
