import React, { useEffect, useState } from "react";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunity,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../store/actions/community_actions";

import {
  Card,
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
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";

import dayjs from "dayjs";
import styles from "./community.module.css";
import { colors } from "../../assets/colors";
import ValidationRules from "../../utils/ValidationRules";

// 섹션 높이 지정
const ContainerHeight = 300;

const CommunityPlan = (props) => {
  const dispatch = useDispatch();

  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();

  // 에러메세지 함수
  const error = (data) => {
    console.log("왜 안되냐?", data);
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  // 일정 편집 버튼(수정, 삭제)
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
          일정 수정
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
          일정 삭제
        </Button>
      ),
    },
  ];

  const [type, setType] = useState("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(() => dayjs(new Date()));

  // Plan 폼
  const [form, setForm] = useState({
    planid: {
      value: 0,
      type: "textInput",
      rules: {
        // isRequired: true,
      },
      valid: false,
    },
    date: {
      value: date,
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
        planid: {
          ...prevState.planid,
          value: data.planid,
        },
        date: {
          ...prevState.date,
          value: dayjs(data.date),
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
        planid: {
          ...prevState.planid,
          value: 0,
        },
        date: {
          ...prevState.date,
          value: dayjs(props.date),
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
      error("조건에 맞는 값을 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 => 공지사항 생성 API요청
  const submitForm = () => {
    console.log("통과");
    if (type === "create") dispatch(createPlan(form));
    else if (type === "update") dispatch(updatePlan(form));
    else if (type === "delete") dispatch(deletePlan(form.planid));
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* 섹션 타이틀 */}
      <Row align={"middle"}>
        <Col span={8}>
          <h1 className={styles.section_title}>Plan</h1>
        </Col>
        <Col span={7} offset={9}>
          <Button
            color="#868e96"
            icon={<PlusOutlined />}
            onClick={() => {
              setData();
              setType("create");
              showModal();
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col span={19}>
          <Card>
            {props.no == true ? (
              <h3 style={{ textAlign: "center" }}>일정이 없습니다</h3>
            ) : (
              <VirtualList
                data={props.data}
                height={ContainerHeight}
                itemHeight={0}
                itemKey="key"
              >
                {(item) =>
                  props.date == item.date.substring(0, 10) ? (
                    <List.Item key={item.key} actions={() => setForm(item)}>
                      <Dropdown
                        menu={{
                          onClick: () => setData(item),
                          items,
                        }}
                        placement="bottom"
                      >
                        <Button type="text" className={styles.plan_item}>
                          <b>{item.contents}</b>
                        </Button>
                      </Dropdown>
                      {/* <h3 style={{}}>⦁ {item.contents}</h3> */}
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
            ? "새로운 일정"
            : type === "update"
            ? "일정 수정"
            : "일정 삭제"
        }
        open={isModalOpen}
        okText={
          type === "create" ? "생성" : type === "update" ? "수정" : "삭제"
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
              {form.date.value.format("YYYY-MM-DD")}
            </h3>

            {type === "delete" ? (
              <p
                style={{
                  fontWeight: "bold",
                  backgroundColor: colors.plan_bg,
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
                placeholder={"일정 내용 입력"}
                onChange={onChange}
                style={{ resize: "none" }}
                rows={10}
              />
            )}
            <br />
            <br />
            {/* <Form.Item>
            <Large_SubmitButton
              name={location.state.type === "Create" ? "COMPLETE" : "UPDATE"}
              bgColor={colors.yiu_dark_blue_light}
              bgColor_hover={colors.yiu_dark_blue}
            />
          </Form.Item> */}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default CommunityPlan;
