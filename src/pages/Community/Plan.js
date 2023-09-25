import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
// 리덕스
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunity,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../store/actions/community_actions";
import { refresh } from "../../store/actions/main_actions";

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
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";

import dayjs from "dayjs";
import styles from "./community.module.css";
import { colors } from "../../assets/colors";
import NoData from "../../components/NoData/NoData";
import ValidationRules from "../../utils/ValidationRules";

// 섹션 높이 지정
const ContainerHeight = 300;

const CommunityPlan = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  const dispatch = useDispatch();

  const { TextArea } = Input;
  const [messageApi, contextHolder] = message.useMessage();

  const ResCreate = useSelector((state) => state.Community.create_plan);
  const ResUpdate = useSelector((state) => state.Community.update_plan);
  const ResDelete = useSelector((state) => state.Community.delete_plan);

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
      showModal();
    }
  };

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

    if (checkValid) {
      submitForm();
    } else {
      errorMsg("내용을 입력해주세요.");
    }
  };

  // 유효성 검사 확인 완료 =>  API요청
  const submitForm = () => {
    switch (type) {
      case "create":
        dispatch(createPlan(form))
          .then((res) => {
            if (res.payload === true) {
              completeMsg("일정이 생성되었습니다!");
              props.refreshData();
              setIsModalOpen(false);
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      case "update":
        dispatch(updatePlan(form))
          .then((res) => {
            if (res.payload === true) {
              completeMsg("일정이 수정되었습니다!");
              props.refreshData();
              setIsModalOpen(false);
            } else ResFunc(res.payload);
          })
          .catch((err) => {
            errorMsg(`잠시 후에 다시 시도해주세요.`);
          });
        break;
      case "delete":
        dispatch(deletePlan(form.planid.value))
          .then((res) => {
            if (res.payload === true) {
              completeMsg("일정이 삭제되었습니다!");
              props.refreshData();
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
      {/* 섹션 타이틀 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className={styles.section_title}>Plan</h1>
        {sessionStorage.getItem("master") == 2 ? (
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
      </div>
      {props.no === true ? (
        <NoData text={"일정이 없습니다"} />
      ) : (
        <VirtualList
          data={props.data}
          height={ContainerHeight}
          itemHeight={0}
          itemKey="key"
        >
          {(item) =>
            props.date == item.date.substring(0, 10) ? (
              <div
                key={item.key}
                actions={() => setForm(item)}
                className={styles.plan_item}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 14 }}>{item.contents}</p>
                  {sessionStorage.getItem("master") == 2 ? (
                    <div>
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
                        />
                      </Dropdown>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <></>
            )
          }
        </VirtualList>
      )}

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
