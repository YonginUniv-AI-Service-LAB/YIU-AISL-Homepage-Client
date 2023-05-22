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
} from "antd";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";

import dayjs from "dayjs";
import styles from "./community.module.css";
import { data_plan } from "../../assets/data/plan";

// 섹션 높이 지정
const ContainerHeight = 300;

const CommunityPlan = (props) => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.Community.plan);

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

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
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
              setType("create");
              showModal();
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col span={19}>
          <Card>
            <VirtualList
              data={props.data}
              height={ContainerHeight}
              itemHeight={47}
              itemKey="key"
            >
              {(item) => (
                <List.Item key={item.key}>
                  <Dropdown
                    menu={{
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
              )}
            </VirtualList>
          </Card>
        </Col>
      </Row>
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
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default CommunityPlan;
